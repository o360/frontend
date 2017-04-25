import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  protected _groups: GroupModel[];
  protected _returnPath = ['/admin/projects'];
  public evalForms = [{
    id: 1,
    name: 'First'
  }, {
    id: 2,
    name: 'Second'
  }];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
      super._load();
    });
  }
}

