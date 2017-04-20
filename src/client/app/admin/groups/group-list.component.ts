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
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit, OnChanges {
  protected _parentId: string = 'null';

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  constructor(service: GroupService) {
    super(service);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      this._update();
    }
  }

  protected _update() {
    let queryParams: IQueryParams = { parentId: this._parentId };
    this._service.list(queryParams).subscribe((list: GroupModel[]) => {
      this._list = list;
      if (!this._list.length) {
        this._isEmpty = true;
      } else {
        this._isEmpty = false;
      }
    });
  }
}
