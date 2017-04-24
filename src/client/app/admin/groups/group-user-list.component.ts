import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserModel } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';
import { ModelId } from '../../core/models/model';
import { IQueryParams } from '../../core/services/rest.service';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupUserListComponent extends ListComponent<UserModel> implements OnChanges {
  protected _groupId: ModelId = 'null';
  public concreteList: boolean = false;

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get groupId() {
    return this._groupId;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams = { groupId: this._groupId };
      this._updateParams();
    }
  }

  public addUser(userId: ModelId) {
    this._routeParams();
    this._groupService.userToGroup(this._groupId, userId).subscribe(() => this._update());
  }

  public delete(groupId?: ModelId, userId?: ModelId) {
    this._groupService.userRemoveFromGroup(groupId, userId).subscribe(() => this._updateParams());
  }


  constructor(service: UserService,
              protected _groupService: GroupService,
              protected _route: ActivatedRoute) {
    super(service);
  }

  protected _routeParams() {
    this._route.params.forEach(this._processRouteParams.bind(this));
  }

  protected _processRouteParams(params: Params) {
    if (params['groupId']) {
      this._groupId = params['groupId'];
    }
  }

  protected _updateParams() {
    let queryParams: IQueryParams = { groupId: this._groupId };
    this._groupId = queryParams.groupId;
    this._update(queryParams);
    this.concreteList = true;
  }
}
