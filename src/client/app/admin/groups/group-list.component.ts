import { Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ModelId } from '../../core/models/model';
import { IQueryParams } from '../../shared/interfaces/query-params.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit {
  protected _parentId: ModelId = null;

  @Input()
  public set parentId(value: ModelId) {
    this._parentId = value;
  }

  constructor(service: GroupService,
              protected _activatedRoute: ActivatedRoute) {
    super(service);
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    this._activatedRoute.params.forEach((params: Params) => {
      if (params['parentId']) {
        this._parentId = params['parentId'];
      }
      let queryParams: IQueryParams = { parentId: this._parentId };
      this._service.list(queryParams).subscribe((list: GroupModel[]) => {
        this._list = list;
      });
    });
  }
}
