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
import { ListComponentDirective } from '../shared/components/list-component.directive';
import { UserModel, UserStatus } from '../core/models/user-model';
import { Filter, FilterType } from '../core/models/filter';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { AuthService } from '../core/services/auth.service';
import { ModelId } from '../core/models/model';
import { UserPictureService } from '../core/services/user-picture.service';
import { IListResponse } from '../core/services/rest.service';

@Component({
  selector: 'bs-users-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponentDirective<UserModel> {
  protected _filters: Filter[] = [{
    name: 'T_USER_NAME',
    field: 'name',
    type: FilterType.STRING,
    values: Object.values(UserModel.name).map(x => ({ value: x }))
  }];

  public get currentUserId(): ModelId {
    return this._authService.user.id;
  }

  public get newUser(): boolean {
    return this._authService.user.status === UserStatus.New;
  }

  constructor(service: UserService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _authService: AuthService,
              protected _userPictureService: UserPictureService) {
    super(service, activatedRoute, router, notificationService);

    this._queryParams.sort = 'lastName';
  }

  protected _update() {
    if (!this.newUser) {
      this._fetching = this._service.list(this._queryParams).subscribe((res: IListResponse<UserModel>) => {
        this._meta = res.meta;
        this._list = res.data;

        this._list.forEach(user => this._fillProfile(user));
      });
    }
  }

  protected _fillProfile(user: UserModel): UserModel {
    (<UserService> this._service).getGroups(user.id)
      .subscribe(response => user.groups = response.data.map(_ => _.name).join(', '));

    if (user.hasPicture) {
      this._userPictureService.getPicture(user.id)
        .subscribe(pic => user.picture = pic);
    }

    return user;
  }
}
