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

import { forkJoin as observableForkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModelId } from '../../core/models/model';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { AdminUserService } from '../../core/services/admin-user.service';
import { ModalDirective } from '../../shared/components/modal/modal.directive';
import { Utils } from '../../utils';
import { TranslateService } from '@ngx-translate/core';

interface ISelectUser {
  id: ModelId;
  name: string;
}

@Component({
  selector: 'bs-users-add-modal',
  templateUrl: 'users-add-modal.component.html'
})
export class AdminUsersAddModalComponent {
  public selectedUsers: ISelectUser[] = [];

  private _groupId: ModelId = null;
  private _selectedUsersIds: ModelId[] = [];
  private _modal: ModalDirective;
  private _usersAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();
  private _availableUsers: any[] = [];
  private _options: any;
  private _users: any;

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get availableUsers(): any[] {
    return this._availableUsers;
  }

  public get options() {
    return this._options;
  }

  public get selectedUsersIds(): ModelId[] {
    return this._selectedUsersIds;
  }

  public set selectedUsersIds(value: ModelId[]) {
    this._selectedUsersIds = value;
  }

  @Output()
  public get usersAdded(): EventEmitter<ModelId[]> {
    return this._usersAdded;
  }

  @ViewChild('modal', { static: true })
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  @ViewChild('users', { static: true })
  public set users(value: any) {
    this._users = value;
  }

  constructor(private _userService: AdminUserService,
              private _groupService: AdminGroupService,
              private _notificationService: NotificationService,
              private _translate: TranslateService) {
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    let transaction = this._selectedUsersIds.map((user) => {
      return { groupId: this._groupId, userId: +user };
    });

    this._groupService.addUsers(transaction).subscribe(() => {
      this._modal.hide();
      this._usersAdded.emit(this._selectedUsersIds);
      this._notificationService.success('T_USERS_ADDED_TO_GROUP');
    });
  }

  public searchFn = (term: string, item: ISelectUser) => {
    return new RegExp(term, 'gi').test(item.name) ||
      new RegExp(term, 'gi').test(Utils.transliterate(item.name));
  }

  public valueChanged(value) {
    this._selectedUsersIds = [];
    if (value) {
      value.forEach((item) => {
        this._selectedUsersIds.push(item.id);
      });
    }
  }

  public addAll() {
    this._selectedUsersIds = this._availableUsers.map(_ => String(_.id));
    this.selectedUsers = this.availableUsers;
  }

  private _load() {
    let allQueryParams = { status: UserStatus.Approved };
    let groupQueryParams = { status: UserStatus.Approved, groupId: this._groupId };
    this._selectedUsersIds = [];
    this.selectedUsers = [];

    observableForkJoin([
      this._userService.list(allQueryParams),
      this._userService.list(groupQueryParams)
    ])
    .pipe(
      map(([allUsers, groupUsers]: [IListResponse<UserModel>, IListResponse<UserModel>]) => {
        return allUsers.data.filter(user => !groupUsers.data.find(groupUser => groupUser.id === user.id));
      })
    )
    .subscribe((availableUsers: UserModel[]) => {
      this._availableUsers = availableUsers.map((user) => {
        return { id: String(user.id), name: `${user.name} (${user.email})` };
      });
    });
  }
}
