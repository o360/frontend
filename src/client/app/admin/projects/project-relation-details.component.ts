import { Component } from '@angular/core';
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
export class ProjectRelationDetailsComponent extends DetailsComponent<RelationModel> {
  constructor(service: RelationService,
              route: ActivatedRoute,
              protected _breadcrumbService: BreadcrumbService,
              protected _projectService: ProjectService) {
    super(service, route);
  }

  protected _update(): void {
    super._update();
    this._route.params.subscribe((params: Params) => {
      this._projectService.get(params['projectId']).subscribe((model: ProjectModel) => {
        this._breadcrumbService.load(model.name, model.id, 'project');
      });
    });
  }
}

