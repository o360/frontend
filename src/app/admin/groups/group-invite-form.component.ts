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

import { of as observableOf } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { InviteModel } from '../../core/models/invite-model';
import { IDataRequestInvite, InviteService } from '../../core/services/invite.service';
import { TranslateService } from '@ngx-translate/core';
import { IListResponse } from '../../core/services/rest.service';
import { GroupModel } from '../../core/models/group-model';
import { Utils } from '../../utils';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';
import { ModelId } from '../../core/models/model';
import { AdminGroupService } from '../../core/services/admin-group.service';

interface ISelectGroup {
  id: ModelId;
  name: string;
}

@Component({
  selector: 'bs-group-invite-form',
  templateUrl: 'group-invite-form.component.html'
})
export class AdminGroupInviteFormComponent extends FormComponent<InviteModel> implements OnInit {
  public selectedGroups: ISelectGroup[];

  private _availableGroups: any[] = [];
  private _emails: string;
  private _selectedGroupsIds: ModelId[] = [];
  private _groupModel: GroupModel;
  private _isMultipleGroups: boolean = true;

  public set emails(value: string) {
    this._emails = value;
  }

  public get emails(): string {
    return this._emails;
  }

  public get isMultipleGroups(): boolean {
    return this._isMultipleGroups;
  }

  public get groupModel(): GroupModel {
    return this._groupModel;
  }

  public get availableGroups(): ISelectGroup[] {
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

    this._returnPath = ['/admin/groups'];
  }

  public ngOnInit() {
    this._loadGroups();
    this._model = new InviteModel();
    this._groupModel = new GroupModel();

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

  public save() {
    (<InviteService> this._service).createRequest(this._getModel()).subscribe(() => {
      if (this._groupModel.id) {
        this._returnPath = [`/admin/groups/${this._groupModel.id}`];
      }
      this._router.navigate(this._returnPath);
      this._notificationService.success('T_SUCCESS_SEND_INVITE');
    });
  }

  public searchFn = (term: string, item: ISelectGroup) => {
    return new RegExp(term, 'gi').test(item.name) ||
      new RegExp(term, 'gi').test(Utils.transliterate(item.name));
  }

  protected _load() {
    this._loadModelGroup().subscribe(this._processModelGroup.bind(this));
  }

  protected _loadModelGroup() {
    if (this._id) {
      this._isMultipleGroups = false;

      return this._groupService.get(this._id);
    }

    return observableOf(this._groupService.createEntity());
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

  private _getEmails() {
    return this.emails.split(',').map((item) => {
      return item.replace(/\s/g, '');
    });
  }

  private _getGroups(): ModelId[] {
    return this._selectedGroupsIds.map((item: any) => {
      return parseInt(item, 10);
    });
  }

  private _getModel(): IDataRequestInvite[] {
    let resultModel: IDataRequestInvite[] = [];

    this._getEmails().forEach((email) => {
      resultModel.push({ email, groups: this._groupModel.id ? [this._groupModel.id] : this._getGroups() });
    });

    return resultModel;
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
