import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';


@Component({
  moduleId: module.id,
  selector: 'bs-group-form-details',
  templateUrl: 'group-form.component.html'
})
export class GroupFormComponent extends FormComponent<GroupModel> {
  protected _parentsList: GroupModel[];

  public get parentsList(): GroupModel[] {
    return this._parentsList;
  }

  protected _getParentGroup() {
    this._service.list().subscribe((list: GroupModel[]) => {
      this._parentsList = list;
    });
  }

  constructor(service: GroupService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
    this._getParentGroup();
  }
}

