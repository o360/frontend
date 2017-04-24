import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class ProjectFormComponent extends FormComponent<ProjectModel> {
  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }
}

