import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class ProjectRelationFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _returnPath = ['/admin/projects'];
  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }
}

