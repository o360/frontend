import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/services/account.service';
import { IListResponse } from '../core/services/rest.service';
import { GroupModel } from '../core/models/group-model';
import { AuthService } from '../core/services/auth.service';
import { UserStatus } from '../core/models/user-model';

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

  constructor(protected _accountService: AccountService,
              protected _authService: AuthService) {
  }

  public ngOnInit() {
    this._getUsersGroups();
  }

  protected _getUsersGroups() {
    if (this._authService.user.status !== UserStatus.New) {
      this._accountService.getGroups().subscribe((response: IListResponse<GroupModel>) => {
        this._groups = response.data;
      });
    }
  }
}
