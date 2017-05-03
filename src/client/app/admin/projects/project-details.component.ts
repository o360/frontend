import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> implements OnInit {
  constructor(service: ProjectService,
              route: ActivatedRoute) {
    super(service, route);
  }
}
