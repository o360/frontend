import { Component } from '@angular/core';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-project-list',
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent extends ListComponent<ProjectModel> {
  public projects = [{
    id: 1,
    name: 'Project1',
    description: 'This is my first project',
    relations: 'some list',
    groupAuditorId: 'some auditor'
  }, {
    id: 2,
    name: 'Project2',
    description: 'This is my second project',
    relations: 'some list',
    groupAuditorId: 'some auditor'
  }];

  constructor(service: ProjectService) {
    super(service);
  }
}
