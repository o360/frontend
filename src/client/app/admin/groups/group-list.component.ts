import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { IQueryParams } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnChanges {
  protected _parentId: string = 'null';

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  constructor(service: GroupService) {
    super(service);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      this._queryParams = { parentId: this._parentId };
      this._update();
    }
  }

  protected _update() {
    let queryParams: IQueryParams = { parentId: this._parentId };
    if (this._parentId !== 'null') {
      this._parentId = queryParams.parentId;
      this._query(queryParams);
    } else {
      this._query(queryParams);
    }
  }

  protected _query(queryParams: IQueryParams) {
    this._service.list(queryParams).subscribe((list: GroupModel[]) => {
      this._list = list;
    });
  }
}
