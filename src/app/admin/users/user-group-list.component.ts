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
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-user-group-list',
  templateUrl: 'user-group-list.component.html'
})
export class AdminUserGroupListComponent extends ListComponentDirective<GroupModel> implements OnInit {
  protected _userId: ModelId;

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  constructor(service: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
    this._listName = 'users-groups';
  }

  public ngOnInit() {
    this._queryParams.userId = this._userId.toString();
    super.ngOnInit();
  }

  public delete(id?: ModelId) {
    (<AdminGroupService> this._service).removeUser(id, this._userId).subscribe(() => {
      this._update();
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }
}
