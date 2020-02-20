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

import { forkJoin as observableForkJoin } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { RelationKind, RelationModel } from '../../core/models/relation-model';
import { AdminRelationService } from '../../core/services/admin-relation.service';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { IListResponse } from '../../core/services/rest.service';
import { AdminFormService } from '../../core/services/admin-form.service';
import { FormModel } from '../../core/models/form-model';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';

@Component({
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class AdminProjectRelationFormComponent extends FormComponent<RelationModel> {
  protected _kinds: string[] = Object.values(RelationKind);
  protected _groups: GroupModel[];
  protected _forms: FormModel[];
  protected _projectId: ModelId = null;
  protected _returnPath = ['/admin/projects'];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get forms(): FormModel[] {
    return this._forms;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get projectId() {
    return this._projectId;
  }

  public get RelationKind() {
    return RelationKind;
  }

  constructor(service: AdminRelationService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _groupService: AdminGroupService,
              protected _formService: AdminFormService,
              protected _projectService: AdminProjectService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public save() {
    this._returnPath = [`/admin/projects/${this._projectId}/relations`];
    super.save();
  }

  protected _load() {
    observableForkJoin([
      this._groupService.list(),
      this._formService.list()
    ]).subscribe(([groups, forms]: [IListResponse<GroupModel>, IListResponse<FormModel>]) => {
      this._groups = groups.data;
      this._forms = forms.data;

      super._load();
    });
  }

  protected _processRouteParams(params: Params) {
    if (params['projectId']) {
      this._projectId = +params['projectId'];
      this._returnPath = ['/admin/projects', this._projectId.toString()];
    }

    super._processRouteParams(params);
  }

  protected _processModel(model: RelationModel) {
    if (this._projectId) {
      model.projectId = this._projectId;
    }

    super._processModel(model);
  }

  protected _fillBreadcrumbs(model: RelationModel) {
    this._projectService.get(this._projectId).subscribe((project: ProjectModel) => {
      let breadcrumbs = [];

      breadcrumbs.push({ label: project.name, url: `/admin/projects/${project.id}` });
      breadcrumbs.push({ label: 'T_PROJECT_RELATION_DETAILS' });

      this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
    });
  }
}
