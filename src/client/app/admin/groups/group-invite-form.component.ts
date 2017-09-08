import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { InviteModel } from '../../core/models/invite-model';
import { InviteService } from '../../core/services/invite.service';
import { TranslateService } from '@ngx-translate/core';
import { GroupService } from '../../core/services/group.service';
import { IListResponse } from '../../core/services/rest.service';
import { GroupModel } from '../../core/models/group-model';
import { Select2OptionData } from 'ng2-select2';
import { Utils } from '../../utils';
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'bs-group-invite-form',
  templateUrl: 'group-invite-form.component.html'
})
export class GroupInviteFormComponent extends FormComponent<InviteModel> implements OnInit {
  private _availableGroups: Select2OptionData[] = [];
  private _options: Select2Options;
  private _emails: string;
  private _selectedGroups: string[] = [];
  private _groupModel: GroupModel;
  private _isMultipleGroups: boolean = true;


  public get isMultipleGroups(): boolean {
    return this._isMultipleGroups;
  }

  public get groupModel(): GroupModel {
    return this._groupModel;
  }

  public set emails(value: string) {
    this._emails = value;
  }

  public get availableGroups(): Select2OptionData[] {
    return this._availableGroups;
  }

  public set options(value: Select2Options) {
    this._options = value;
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
              private _groupService: GroupService) {
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
    super.ngOnInit();
  }

  public valueChanged(value: { value: string[] }) {
    this._selectedGroups = [...value.value] || [];
  }

  public save() {
    let resultModel: any = [];

    this._getEmails().forEach(email => {
      resultModel.push({ email: email, groupIds: this._groupModel.id ? [this._groupModel.id] : this._getGroups() });
    });

    console.log(resultModel);

    (<InviteService>this._service).createRequest(resultModel).subscribe(model => {
      if (this._groupModel.id) {
        this._returnPath = [`/admin/groups/${this._groupModel.id}`];
      }
      this._router.navigate(this._returnPath);
      this._notificationService.success('T_SUCCESS_SAVED');
    });
  }

  private _getEmails(): String[] {
    return this._emails.split(',').map(function (item) {
      return item.replace(/\s/g, '');
    });
  }

  private _getGroups(): Number[] {
    return this._selectedGroups.map(item => {
      return parseInt(item, 10);
    });
  }

  private _loadGroups() {
    this._selectedGroups = [];
    this._groupService.list().subscribe((res: IListResponse<GroupModel>) => {
      return this._availableGroups = res.data.map(group => {
        return { id: String(group.id), text: `${group.name}` };
      });
    });
  }

  protected _loadModel() {
    if (this._id) {
      this._isMultipleGroups = false;
      return this._groupService.get(this._id);
    } else {
      return Observable.of(this._service.createEntity());
    }
  }

  protected _processModel(model: GroupModel) {
    this._groupModel = model;
    this._fillBreadcrumbs(model);
  }

  protected _fillBreadcrumbs(model: GroupModel) {
    if (model.hasOwnProperty('name')) {
      this._breadcrumbService.overrideBreadcrumb([{ label: model.name, url: `admin/groups/` },
        { label: 'T_ACTION_SEND_INVITE' }]);
    }
  }
}

