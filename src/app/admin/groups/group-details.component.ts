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
import { GroupModel } from '../../core/models/group-model';
import { DetailsComponent } from '../../shared/components/details.component';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-group-details',
  templateUrl: 'group-details.component.html'
})
export class AdminGroupDetailsComponent extends DetailsComponent<GroupModel> {
  constructor(service: AdminGroupService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/groups';
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => {
      if(this._model.parentId) {
        this._returnPath = `${'/admin/groups'}/${this._model.parentId}`;
      }
      this._router.navigate([this._returnPath]);
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  protected async _fillBreadcrumbs(model: GroupModel) {
    let breadcrumbs: IBreadcrumb[] = [];

    breadcrumbs.push({ label: model.name });

    let item = model;

    while (item.parentId) {
      item = await this._service.get(item.parentId).toPromise();

      breadcrumbs.push({ label: item.name, url: `${this._returnPath}/${item.id}` });
    }

    this._breadcrumbService.overrideBreadcrumb(breadcrumbs.reverse());
  }
}
