import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserModel } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';
import { ModelId } from '../../core/models/model';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupUserListComponent extends ListComponent<UserModel> implements OnInit, OnChanges {
  protected _groupId: string = 'null';

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get groupId() {
    return this._groupId;
  }

  constructor(service: UserService,
              activatedRoute: ActivatedRoute,
              router: Router,
              protected _groupService: GroupService) {
    super(service, activatedRoute, router);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams = Object.assign(this._queryParams, { groupId: this._groupId });
      this._update();
    }
  }

  public delete(groupId?: ModelId, userId?: ModelId) {
    this._groupService.removeUser(groupId, userId).subscribe(() => this._update());
  }
}
