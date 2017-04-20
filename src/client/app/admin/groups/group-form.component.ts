import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ModelId } from '../../core/models/model';


@Component({
  moduleId: module.id,
  selector: 'bs-group-form-details',
  templateUrl: 'group-form.component.html'
})
export class GroupFormComponent extends FormComponent<GroupModel> implements OnInit {
  protected _groups: GroupModel[];
  protected _parentId: ModelId = null;

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

  public ngOnInit(): void {
    this._getGroups();
    this._query();
  }

  protected _getGroups() {
    this._service.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
      super.ngOnInit();
    });
  }

  protected _query() {
    this._route.params.subscribe(params => {
      this._parentId = +params['parentId'];
    });
  }

  protected _load() {
    super._load();

    if (this._parentId) {
      this._model.parentId = this._parentId;
    }
  }
}

