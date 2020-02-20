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

import { Component, Input, OnInit } from '@angular/core';
import { ModelId } from '../../core/models/model';
import { AdminGroupService, IDataRequestUserGroups } from '../../core/services/admin-group.service';
import { IQueryParams } from '../../core/services/rest.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { GroupModel } from '../../core/models/group-model';
import { NotificationService } from '../../core/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEntity } from '../../core/services/confirmation.service';
import { AdminUserService } from '../../core/services/admin-user.service';

@Component({
  selector: 'bs-user-confirmation',
  templateUrl: 'user-confirmation.component.html'
})
export class AdminUserConfirmationComponent extends ListComponentDirective<GroupModel> implements OnInit {
  protected _queryParams: IQueryParams;
  protected _userId: ModelId;

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  public get userId(): ModelId {
    return this._userId;
  }

  constructor(service: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _groupService: AdminGroupService,
              protected _userService: AdminUserService) {
    super(service, activatedRoute, router, notificationService);

  }

  public ngOnInit() {
    this._queryParams.userId = this._userId;
    super.ngOnInit();
  }

  public deleteFromAllGroup() {
    let requestData: IDataRequestUserGroups[] = [];
    this._list.forEach((result: IEntity) => {
      let item: IDataRequestUserGroups = { 'groupId': result.id, 'userId': this._userId };
      requestData.push(item);
    });
    this._groupService.removeUserFromAllGroup(requestData).subscribe(() => {
      this._userService.delete(this._userId).subscribe(() => {
        this._notificationService.success('T_SUCCESS_DELETED_USER_FROM_GROUPS');
        this._router.navigate(['/users'], { skipLocationChange: true }).then(()=>
          this._router.navigate(['/admin/users']));
      });
    });
  }
}
