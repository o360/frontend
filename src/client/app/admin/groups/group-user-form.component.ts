import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserModel } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ModelId } from '../../core/models/model';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { IListResponse } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-form',
  templateUrl: 'group-user-form.component.html'
})
export class GroupUserFormComponent extends FormComponent<UserModel> implements OnChanges {
  protected _queryParams = {};
  protected _groupId: string = 'null';
  protected _users: UserModel[];

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get users(): UserModel[] {
    return this._users;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams = Object.assign(this._queryParams, { groupId: this._groupId });
    }
  }

  public addUser(userId: ModelId) {
    this._groupService.addUser(this._groupId, userId).subscribe();
    this._users = this._users.filter(function (element) {
      return element.id !== userId;
    });
  }

  protected _load() {
    console.log(this._queryParams);
    this._service.list(this._queryParams).subscribe((res: IListResponse<UserModel>) => {
      this._users = res.data;
    });
  }
}
