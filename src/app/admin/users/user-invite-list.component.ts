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
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { InviteModel } from '../../core/models/invite-model';
import { InviteService } from '../../core/services/invite.service';
import { GroupModel } from '../../core/models/group-model';

@Component({
  selector: 'bs-user-invite',
  templateUrl: 'user-invite-list.component.html'
})
export class AdminUserInviteListComponent extends ListComponentDirective<InviteModel> implements OnInit {
  private _groups: GroupModel[];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  constructor(service: InviteService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  protected _update() {
    delete this._queryParams.sort;
    super._update();
  }
}
