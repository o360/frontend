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
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { IListResponse } from '../../core/services/rest.service';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class AdminProjectFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _returnPath: any[] = ['/admin/projects'];

  public get auditors(): GroupModel[] {
    return this._auditors;
  }

  constructor(service: AdminProjectService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _groupService: AdminGroupService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._auditors = list.data;
      super._load();
    });
  }

  protected _setModelName(model: ProjectModel) {
    this._modelName = model.name;
  }
}
