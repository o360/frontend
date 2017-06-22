import { Component } from '@angular/core';
import { AccountModel } from '../core/models/account-model';
import { AuthService } from '../core/services/auth.service';
import { ProfileService } from '../core/services/profile.service';
import { UserGender } from '../core/models/user-model';
import { NotificationService } from '../core/services/notification.service';
import { TimeZone } from '../shared/config/timezone.config';


@Component({
  moduleId: module.id,
  selector: 'bs-new-user',
  templateUrl: 'new-account.component.html'
})
export class NewAccountComponent {
  private _genders: string[] = Object.values(UserGender);
  private _timezones: string[] = Object.values(TimeZone);
  private _user: AccountModel;

  public get genders(): string[] {
    return this._genders;
  }

  public get timezones(): string[] {
    return this._timezones;
  }

  public get user(): AccountModel {
    return this._user;
  }

  constructor(private _authService: AuthService,
              private _profileService: ProfileService,
              private _notificationService: NotificationService) {
    this._user = this._authService.user;
    this._setTimeZone();
  }

  public logout() {
    this._authService.logout();
  }

  public update() {
    this._profileService.save(this._user).subscribe(
      () => {
        this._notificationService.success('T_SUCCESS_NEW_USER_SAVED');
      },
      error => this._notificationService.error('T_ERROR_SAVED')
    );
  }

  protected _setTimeZone() {
    if (this._user && (this._user.timezone === undefined || this._user.timezone === TimeZone.UTC)) {
      let browserZone = Math.floor(new Date().getTimezoneOffset() / -60);
      let result: string;
      if (browserZone > 0) {
        result = (browserZone < 10) ? `+0${browserZone}:00` : `+${browserZone}:00`;
      } else if (browserZone === 0) {
        result = 'Z';
      } else {
        result = (browserZone > -10) ? `-0${browserZone}:00` : `-${browserZone}:00`;
      }

      console.log(result);

      this._user.timezone = result;
    }
  }
}
