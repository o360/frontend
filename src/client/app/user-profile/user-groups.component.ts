import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/services/account.service';
import { IListResponse, IResponseMeta } from '../core/services/rest.service';
import { GroupModel } from '../core/models/group-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-groups',
  templateUrl: 'user-groups.component.html',
})
export class UserGroupsComponent implements OnInit {
  protected _groups: GroupModel[];
  protected _groupsMeta: IResponseMeta;

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get groupsMeta(): IResponseMeta {
    return this._groupsMeta;
  }

  constructor(protected _accountService: AccountService) {
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    this._getUsersGroups();
  }

  protected _getUsersGroups() {
    this._accountService.getGroups().subscribe((response: IListResponse<GroupModel>) => {
      this._groups = response.data;
      this._groupsMeta = response.meta;
    });
  }
}
