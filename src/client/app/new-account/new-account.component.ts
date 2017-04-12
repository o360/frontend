import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AccountModel } from '../core/models/account-model';
import { AccountService } from '../core/services/account.service';
import { UserService } from '../core/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'bs-new-user',
  templateUrl: 'new-account.component.html'
})
export class NewAccountComponent {
  private _user: AccountModel;

  public get user(): AccountModel {
    return this._user;
  }

  constructor(private _authService: AuthService,
              private _userService: UserService) {
    this._user = this._authService.user;
  }

  public logout() {
    this._authService.logout();
  }

  public submit() {
    this._userService.save(this._user);
  }

}
