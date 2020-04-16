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

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { UserModel } from '../../core/models/user-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { AdminUserService } from '../../core/services/admin-user.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class AdminGroupUserListComponent extends ListComponentDirective<UserModel> implements OnInit, OnChanges {
  private _groupId: string = 'null';

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get groupId(): string {
    return this._groupId;
  }

  constructor(service: AdminUserService,
              protected _groupService: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'group-users';
    this._queryParams.sort = 'status,lastName';
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams = Object.assign(this._queryParams, { groupId: this._groupId });
      this._update();
    }
  }

  public delete(userId ?: ModelId) {
    this._groupService.removeUser(this._groupId, userId).subscribe(() => {
      this._update();
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  public usersAdded() {
    this._update();
  }
}
