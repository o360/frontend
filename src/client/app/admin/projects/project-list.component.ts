import { Component } from '@angular/core';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-project-list',
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent extends ListComponent<ProjectModel> {
  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(service, activatedRoute, router);
  }
}
