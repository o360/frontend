import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit {
  constructor(protected _service: GroupService) {
    super(_service);
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    let queryParams: any = { parentId: null };
    this._service.list(queryParams).subscribe((list: GroupModel[]) => {
      this._list = list;
    });
  }
}
