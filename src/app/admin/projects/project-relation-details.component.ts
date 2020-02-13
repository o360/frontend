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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { RelationModel } from '../../core/models/relation-model';
import { AdminRelationService } from '../../core/services/admin-relation.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class AdminProjectRelationDetailsComponent extends DetailsComponent<RelationModel> implements OnInit {
  constructor(service: AdminRelationService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _projectService: AdminProjectService) {
    super(service, route, router, breadcrumbService, notificationService);
  }

  public ngOnInit() {
    let projectId;
    this._route.params.subscribe((params: Params) => {
      projectId = params['projectId'];
      this._returnPath = `/admin/projects/${projectId}`;
    });
    super.ngOnInit();
  }

  protected _fillBreadcrumbs(model: RelationModel) {
    this._projectService.get(model.projectId).subscribe((project: ProjectModel) => {
      let breadcrumbs = [];

      breadcrumbs.push({ label: project.name, url: `/admin/projects/${project.id}` });
      breadcrumbs.push({ label: 'T_PROJECT_RELATION_DETAILS' });

      this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
    });
  }
}
