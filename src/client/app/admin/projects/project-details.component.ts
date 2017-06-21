import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { DetailsComponent } from '../../shared/components/details.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> {
  constructor(service: ProjectService,
              route: ActivatedRoute) {
    super(service, route);
  }
}
