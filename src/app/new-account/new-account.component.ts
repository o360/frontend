/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { AccountModel } from '../core/models/account-model';
import { AuthService } from '../core/services/auth.service';
import { UserGender, UserStatus } from '../core/models/user-model';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/account.service';
import { inviteCode } from '../login/login.component';
import { InviteService } from '../core/services/invite.service';

import * as moment from 'moment-timezone';
import { UserPictureService } from '../core/services/user-picture.service';

@Component({
  selector: 'bs-new-user',
  templateUrl: 'new-account.component.html'
})
export class NewAccountComponent {
  private _genders: string[] = Object.values(UserGender);
  private _timezones: string[] = moment.tz.names();
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
              private _accountService: AccountService,
              private _notificationService: NotificationService,
              private _router: Router,
              private _userPictureService: UserPictureService,
              private _inviteService: InviteService) {
    this._user = this._authService.user;
    this._setTimeZone();

    if (this._user.hasPicture) {
      this._getUserPicture();
    }
  }

  public logout() {
    this._authService.logout();
  }

  public update() {
    let code = localStorage[inviteCode];
    localStorage.removeItem(inviteCode);
    this._accountService.save(this._user).subscribe(
      (user) => {
        this._authService.user = user;
        if (code) {
          this._inviteService
            .asseptInvite({ code })
            .subscribe(() => {
              this._authService.user.status = UserStatus.Approved;
            });
        }
        this._router.navigate(['/profile']);
      },
      error => this._notificationService.error('T_ERROR_SAVED')
    );
  }

  public getOffset(tzId: string) {
    return moment.tz(tzId).format('Z');
  }

  public savePicture(image: any) {
    this._accountService.setPicture(image).subscribe((picture) => {
      this._getUserPicture();
    }, error => this._notificationService.error(error));
  }

  protected _setTimeZone() {
    if (this._user && (this._user.timezone === 'GMT' || this._user.timezone === 'Z' || !this._user.timezone)) {
      this._user.timezone = moment.tz.guess();
    }
  }

  protected _getUserPicture() {
    this._userPictureService.getPicture(this._user.id).subscribe(picture => this._user.picture = picture);
  }
}
