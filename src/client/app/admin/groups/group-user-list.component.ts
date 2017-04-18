import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupChildrenListComponent extends ListComponent<GroupModel> implements OnInit {
  constructor(protected _service: GroupService,
              protected _activatedRoute: ActivatedRoute) {
    super(_service);
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    this._activatedRoute.params.forEach((params: Params) => {
      let parentId = params['parentId'];
      let queryParams: any = { parentId: parentId };
      this._service.list(queryParams).subscribe((list: GroupModel[]) => {
        this._list = list;
      });
    });
  }
}
