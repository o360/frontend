import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupService } from '../../core/services/group.service';
import { GroupModel } from '../../core/models/group-model';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> implements OnInit {
  protected _relations: any;
  protected _formRelation: boolean = false;
  protected _groups: GroupModel[];

  public get relations(): any {
    return this._relations;
  }

  public get formRelation(): any {
    return this._formRelation;
  }

  public onFormRelation() {
    return this._formRelation = !this._formRelation;
  }

  public ngOnInit() {
    super.ngOnInit();
    this._load();
  }

  constructor(service: ProjectService, route: ActivatedRoute, protected _groupService: GroupService) {
    super(service, route);
  }

  protected _update(): void {
    this._service.list().subscribe((list: ProjectModel[]) => {
      this._relations = list.map(function (a) {
        return a.relations;
      })[0];
      super._update();
    });
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
    });
  }
}
