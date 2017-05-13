import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { GroupService } from '../../core/services/group.service';
import { IListResponse } from '../../core/services/rest.service';
import { FormComponent } from '../../shared/components/form.component';


@Component({
  moduleId: module.id,
  selector: 'bs-group-form',
  templateUrl: 'group-form.component.html'
})
export class GroupFormComponent extends FormComponent<GroupModel> {
  protected _groups: GroupModel[];
  protected _parentId: ModelId = null;
  protected _returnPath: any[] = ['/admin/groups'];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get parentId() {
    return this._parentId;
  }

  constructor(service: GroupService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }

  protected _load() {
    this._service.list().subscribe((res: IListResponse<GroupModel>) => {
      this._groups = res.data;
      super._load();
    });
  }

  protected _processRouteParams(params: Params) {
    if (params['parentId']) {
      this._parentId = +params['parentId'];
      this._returnPath = ['/admin/groups/', this._parentId];
    }

    super._processRouteParams(params);
  }

  protected _processModel(model: GroupModel) {
    if (this._parentId) {
      model.parentId = this._parentId;
    }

    super._processModel(model);
  }
}

