import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class ProjectRelationDetailsComponent extends DetailsComponent<RelationModel> implements OnInit {
  private _hasInProgressProject: boolean;

  public set hasInProgressProject(value: boolean) {
    this._hasInProgressProject = value;
  }

  constructor(service: RelationService,
              route: ActivatedRoute,
              breadcrumbService: BreadcrumbService,
              protected _projectService: ProjectService) {
    super(service, route, breadcrumbService);
  }

  protected _fillBreadcrumbs(model: RelationModel) {
    this._projectService.get(model.projectId).subscribe((project: ProjectModel) => {
      this._hasInProgressProject = project.hasInProgressEvents;

      let breadcrumbs = [];

      breadcrumbs.push({ label: project.name, url: `/admin/projects/${project.id}` });
      breadcrumbs.push({ label: 'T_PROJECT_RELATION_DETAILS' });

      this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
    });
  }
}

