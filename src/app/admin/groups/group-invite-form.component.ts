
import {of as observableOf,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { InviteModel } from '../../core/models/invite-model';
import { IDataRequestInvite, InviteService } from '../../core/services/invite.service';
import { TranslateService } from '@ngx-translate/core';
import { IListResponse } from '../../core/services/rest.service';
import { GroupModel } from '../../core/models/group-model';
import { Select2OptionData } from 'ng2-select2';
import { Utils } from '../../utils';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';
import { ModelId } from '../../core/models/model';
import { AdminGroupService } from '../../core/services/admin-group.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-invite-form',
  templateUrl: 'group-invite-form.component.html'
})
export class AdminGroupInviteFormComponent extends FormComponent<InviteModel> implements OnInit {
  private _availableGroups: Select2OptionData[] = [];
  private _options: Select2Options;
  private _emails: string;
  private _selectedGroups: string[] = [];
  private _groupModel: GroupModel;
  private _isMultipleGroups: boolean = true;

  public set options(value: Select2Options) {
    this._options = value;
  }

  public set emails(value: string) {
    this._emails = value;
  }

  public get isMultipleGroups(): boolean {
    return this._isMultipleGroups;
  }

  public get groupModel(): GroupModel {
    return this._groupModel;
  }

  public get availableGroups(): Select2OptionData[] {
    return this._availableGroups;
  }

  public get options(): Select2Options {
    return this._options;
  }

  constructor(service: InviteService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              private _translate: TranslateService,
              private _groupService: AdminGroupService) {
    super(service, router, route, notificationService, breadcrumbService);

    this._returnPath = ['/admin/groups'];
  }

  public ngOnInit() {
    this._loadGroups();
    this._options = {
      allowClear: true,
      placeholder: '',
      multiple: true,
      openOnEnter: true,
      closeOnSelect: true,
      dropdownAutoWidth: true,
      escapeMarkup: (term: any) => {
        return (term === 'No results found') ? this._translate.instant('T_EMPTY') : term;
      },
      matcher: (term: string, text: string) => {
        return new RegExp(term, 'gi').test(text) ||
          new RegExp(term, 'gi').test(Utils.transliterate(text));
      }
    };
    this._model = new InviteModel();
    this._groupModel = new GroupModel();

    super.ngOnInit();
  }

  public valueChanged(value: { value: string[] }) {
    this._selectedGroups = [...value.value] || [];
  }

  public save() {
    (<InviteService>this._service).createRequest(this._getModel()).subscribe(() => {
      if (this._groupModel.id) {
        this._returnPath = [`/admin/groups/${this._groupModel.id}`];
      }
      this._router.navigate(this._returnPath);
      this._notificationService.success('T_SUCCESS_SEND_INVITE');
    });
  }

  private _getEmails() {
    return this._emails.split(',').map(function (item) {
      return item.replace(/\s/g, '');
    });
  }

  private _getGroups(): ModelId[] {
    return this._selectedGroups.map(item => {
      return parseInt(item, 10);
    });
  }

  private _getModel(): IDataRequestInvite[] {
    let resultModel: IDataRequestInvite[] = [];

    this._getEmails().forEach(email => {
      resultModel.push({ email: email, groups: this._groupModel.id ? [this._groupModel.id] : this._getGroups() });
    });

    return resultModel;
  }

  private _loadGroups() {
    this._selectedGroups = [];

    this._groupService.list().subscribe((res: IListResponse<GroupModel>) => {
      return this._availableGroups = res.data.map(group => {
        return { id: String(group.id), text: `${group.name}` };
      });
    });
  }

  protected _load() {
    this._loadModelGroup().subscribe(this._processModelGroup.bind(this));
  }

  protected _loadModelGroup() {
    if (this._id) {
      this._isMultipleGroups = false;
      return this._groupService.get(this._id);
    } else {
      return observableOf(this._groupService.createEntity());
    }
  }

  protected _processModelGroup(model: GroupModel) {
    this._groupModel = model;

    this._fillBreadcrumbsGroup(model);
  }

  protected async _fillBreadcrumbsGroup(model: GroupModel) {
    let breadcrumbs: IBreadcrumb[] = [];
    let item = model;

    if (item.name) {
      breadcrumbs.push({ label: item.name, url: `/admin/groups/${item.id}` });
      while (item.parentId) {
        item = await this._groupService.get(item.parentId).toPromise();
        breadcrumbs.push({ label: item.name, url: `/admin/groups/${item.id}` });
        breadcrumbs.reverse();
      }
    }

    breadcrumbs.push({ label: 'T_ACTION_SEND_INVITE' });

    this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
  }
}

