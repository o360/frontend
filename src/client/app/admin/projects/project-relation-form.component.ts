import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { GroupService } from '../../core/services/group.service';
import { RelationKind, RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { IListResponse } from '../../core/services/rest.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class ProjectRelationFormComponent extends FormComponent<RelationModel> {
  protected _kinds: string[] = Object.values(RelationKind);
  protected _groups: GroupModel[];
  protected _projectId: ModelId = null;
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

  public get kinds(): string[] {
    return this._kinds;
  }

  public get projectId() {
    return this._projectId;
  }

  constructor(service: RelationService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._groups = list.data;
    });
    super._load();
  }

  protected _processRouteParams(params: Params) {
    if (params['projectId']) {
      this._projectId = +params['projectId'];
    }

    super._processRouteParams(params);
  }

  protected _processModel(model: RelationModel) {
    if (this._projectId) {
      model.projectId = this._projectId;
    }

    super._processModel(model);
  }
}


