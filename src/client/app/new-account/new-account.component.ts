import { Component } from '@angular/core';
import { AccountModel } from '../core/models/account-model';
import { AuthService } from '../core/services/auth.service';
import { ProfileService } from '../core/services/profile.service';
import { UserGender } from '../core/models/user-model';
import { NotificationService } from '../core/services/notification.service';


@Component({
  moduleId: module.id,
  selector: 'bs-new-user',
  templateUrl: 'new-account.component.html'
})
export class NewAccountComponent {
  private _genders: string[] = Object.values(UserGender);
  private _user: AccountModel;

  public get genders(): string[] {
    return this._genders;
  }

  public get user(): AccountModel {
    return this._user;
  }

  constructor(private _authService: AuthService,
              private _profileService: ProfileService,
              private _notificationService: NotificationService) {
    this._user = this._authService.user;
  }

  public logout() {
    this._authService.logout();
  }

  public update() {
    this._profileService.save(this._user).subscribe(
      () => {
        this._notificationService.success('T_SUCCESS_SAVED');
      },
      error => this._notificationService.error('T_ERROR_SAVED')
    );
  }

}
