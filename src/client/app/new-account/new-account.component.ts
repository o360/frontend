import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AccountModel } from '../core/models/account-model';
import { ProfileService } from '../core/services/profile.service';

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
              private _profileService: ProfileService) {
    this._user = this._authService.user;
  }

  public logout() {
    this._authService.logout();
  }

  public update() {
    this._profileService.save(this._user).subscribe();
  }

}
