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
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../core/models/user-model';
import { AdminUserService } from '../../core/services/admin-user.service';
import { DetailsComponent } from '../../shared/components/details.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserPictureService } from '../../core/services/user-picture.service';

@Component({
  selector: 'bs-user-details',
  templateUrl: `user-details.component.html`
})
export class AdminUserDetailsComponent extends DetailsComponent<UserModel> {
  constructor(service: AdminUserService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _userPictureService: UserPictureService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/users';
  }

  protected _update() {
    this._service.get(this._id).subscribe((model: UserModel) => {
      this._model = model;
      this._fillBreadcrumbs(model);

      if (model.hasPicture) {
        this._loadUserPicture();
      }
    });
  }

  protected _loadUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(pic => this._model.picture = pic);
  }
}
