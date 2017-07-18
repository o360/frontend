import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class ProjectRelationDetailsComponent extends DetailsComponent<RelationModel> implements OnInit {
  constructor(service: RelationService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _projectService: ProjectService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = `/admin/projects`;

    if (this._model) {
      this._returnPath = `/admin/projects/${this._model.projectId}`;
    }
  }

  protected _fillBreadcrumbs(model: RelationModel) {
    this._projectService.get(model.projectId).subscribe((project: ProjectModel) => {
      let breadcrumbs = [];

      breadcrumbs.push({ label: project.name, url: `${this._returnPath}` });
      breadcrumbs.push({ label: 'T_PROJECT_RELATION_DETAILS' });

      this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
    });
  }
}

