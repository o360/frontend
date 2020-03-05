/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { InviteModel } from '../../core/models/invite-model';
import { IDataRequestInvite, InviteService } from '../../core/services/invite.service';
import { TranslateService } from '@ngx-translate/core';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { IListResponse } from '../../core/services/rest.service';
import { GroupModel } from '../../core/models/group-model';
import { Utils } from '../../utils';
import { ModelId } from '../../core/models/model';

interface ISelectGroup {
  id: ModelId;
  name: string;
}

@Component({
  selector: 'bs-user-invite-form',
  templateUrl: 'user-invite-form.component.html'
})
export class AdminUserInviteFormComponent extends FormComponent<InviteModel> implements OnInit {
  public selectedGroups: ISelectGroup[] =[];

  private _availableGroups: any[] = [];
  private _emails: string;
  private _selectedGroupsIds: ModelId[] = [];

  public set emails(value: string) {
    this._emails = value;
  }

  public get emails(): string {
    return this._emails;
  }

  public get availableGroups(): any[] {
    return this._availableGroups;
  }

  constructor(service: InviteService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              private _translate: TranslateService,
              private _groupService: AdminGroupService) {
    super(service, router, route, notificationService, breadcrumbService);

    this._returnPath = ['/admin/users/invites'];
  }

  public ngOnInit() {
    this._loadGroups();
    super.ngOnInit();
  }

  public valueChanged(value) {
    this._selectedGroupsIds = [];
    if (value) {
      value.forEach((item) => {
        this._selectedGroupsIds.push(item.id);
      });
    }
  }

  public searchFn = (term: string, item: ISelectGroup) => {
    return new RegExp(term, 'gi').test(item.name) ||
      new RegExp(term, 'gi').test(Utils.transliterate(item.name));
  }

  public save() {
    let resultModel: IDataRequestInvite[] = [];
    this._getEmails().forEach((email) => {
      resultModel.push({ email, groups: this._getGroups() });
    });

    (<InviteService> this._service).createRequest(resultModel).subscribe((model) => {
      if (this._returnPath) {
        this._router.navigate([this._returnPath]);
      }
      this._notificationService.success('T_SUCCESS_SEND_INVITE');
    });
  }

  protected _fillBreadcrumbs() {
    this._breadcrumbService.overrideBreadcrumb([{
      label: 'T_INVITES',
      url: `/admin/users/invites`
    }, {
      label: 'T_ACTION_SEND_INVITE'
    }]);
  }

  private _getEmails() {
    return this.emails.split(',').map((item) => {
      return item.replace(/\s/g, '');
    });
  }

  private _getGroups() {
    return this._selectedGroupsIds.map((item) => {
      return parseInt(item.toString(), 10);
    });
  }

  private _loadGroups() {
    this._selectedGroupsIds = [];
    this.selectedGroups = [];
    this._groupService.list().subscribe((res: IListResponse<GroupModel>) => {
      return this._availableGroups = res.data.map((group) => {
        return { id: String(group.id), name: `${group.name}` };
      });
    });
  }
}
