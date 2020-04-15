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

import { Component } from '@angular/core';
import { UserModel, UserRole, UserStatus } from '../../core/models/user-model';
import { AdminUserService } from '../../core/services/admin-user.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { Filter, FilterType } from '../../core/models/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-user-list',
  templateUrl: 'user-list.component.html'
})
export class AdminUserListComponent extends ListComponentDirective<UserModel> {
  protected _filters: Filter[] = [{
    name: 'T_USER_STATUS',
    field: 'status',
    type: FilterType.SELECT,
    values: Object.values(UserStatus).map(x => ({ name: `T_USER_STATUS_${x.toUpperCase()}`, value: x }))
  }, {
    name: 'T_USER_ROLE',
    field: 'role',
    type: FilterType.SELECT,
    values: Object.values(UserRole).map(x => ({ name: `T_USER_ROLE_${x.toUpperCase()}`, value: x }))
  }, {
    name: 'T_USER_NAME',
    field: 'name',
    type: FilterType.STRING,
    values: Object.values(UserModel.name).map(x => ({ value: x }))
  }];

  constructor(service: AdminUserService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._queryParams.sort = 'status,lastName';
  }

  public get UserStatus() {
    return UserStatus;
  }

  public approve(user: UserModel) {
    user.status = UserStatus.Approved;
    this._service.save(user).subscribe(
      () => {
        this._update();
        this._notificationService.success('T_SUCCESS_SAVED');
      },
      () => this._update()
    );
  }
}
