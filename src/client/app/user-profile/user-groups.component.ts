import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/services/account.service';
import { IListResponse } from '../core/services/rest.service';
import { GroupModel } from '../core/models/group-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-groups',
  templateUrl: 'user-groups.component.html',
})
export class UserGroupsComponent implements OnInit {
  protected _groups: GroupModel[];

  public get groups(): string {
    return this._groups.map(_ => _.name).join(', ');
  }

  public get isLoaded(): boolean {
    return !!this._groups;
  }

  constructor(protected _accountService: AccountService) {
  }

  public ngOnInit() {
    this._getUsersGroups();
  }

  protected _getUsersGroups() {
    this._accountService.getGroups().subscribe((response: IListResponse<GroupModel>) => {
      this._groups = response.data;
    });
  }
}
