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
import { ModelId } from '../../core/models/model';

export interface IInvite {
  email: string;
  groups: ModelId[];
}

@Component({
  moduleId: module.id,
  selector: 'bs-user-invite-form',
  templateUrl: 'user-invite-form.component.html'
})
export class UserInviteFormComponent extends FormComponent<InviteModel> implements OnInit {
  private _availableGroups: Select2OptionData[] = [];
  private _options: Select2Options;
  private _emails: string;
  private _selectedGroups: string[] = [];

  public get selectedGroups(): string[] {
    return this._selectedGroups;
  }

  public set selectedGroups(value: string[]) {
    this._selectedGroups = value;
  }

  public get emails(): string {
    return this._emails;
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

    this._returnPath = ['/admin/users/invite'];
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
    super.ngOnInit();
  }

  public valueChanged(value: { value: string[] }) {
    this._selectedGroups = [...value.value] || [];
  }


  public save() {
    let resultModel: any = [];
    this._getEmails().forEach(email => {
      resultModel.push({ email: email, groups: this._getGroups() });
    });

    (<InviteService>this._service).createRequest(resultModel).subscribe(model => {
      if (this._returnPath) {
        this._router.navigate([this._returnPath]);
      }
      this._notificationService.success('T_SUCCESS_SEND_INVITE');
    });
  }

  private _getEmails() {
    return this._emails.split(',').map(function (item) {
      return item.replace(/\s/g, '');
    });
  }

  private _getGroups() {
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

  protected _fillBreadcrumbs() {
    this._breadcrumbService.overrideBreadcrumb([{
      label: 'T_INVITES',
      url: `/admin/users/invites`
    }, {
      label:'T_ACTION_SEND_INVITE'
    }]);
  }
}

