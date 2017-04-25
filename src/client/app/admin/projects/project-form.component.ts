import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class ProjectFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _returnPath = ['/admin/projects'];

  public get auditors(): GroupModel[] {
    return this._auditors;
  }

  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._auditors = list;
      super._load();
    });
  }
}

