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
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { AccountService } from '../core/services/account.service';
import { AccountModel } from '../core/models/account-model';
import { UserStatus } from '../core/models/user-model';
import { RouterHistoryService } from '../core/services/router-history.service';

@Component({
  selector: 'bs-terms',
  templateUrl: 'agreement.component.html',
  styleUrls: ['agreement.component.scss']
})
export class AgreementComponent {
  protected _approved: boolean = false;
  protected _approveState: boolean;

  public get approved(): boolean {
    return this._approved;
  }

  public set approved(value: boolean) {
    this._approved = value;
  }

  public get user(): AccountModel {
    return this._auth.user;
  }

  public get approveState(): boolean {
    return this._approveState;
  }

  constructor(protected _auth: AuthService,
              protected _accountService: AccountService,
              protected _router: Router,
              protected _routerHistoryService: RouterHistoryService,
              protected _notificationService: NotificationService) {
    this._approveState =  this._auth.user.termsApproved;
  }

  public approve() {
    this._auth.user.termsApproved = this._approved; // @todo: SOP-481

    this._accountService.save(this._auth.user).subscribe(() => {
      this._router.navigate(['']);
      if (this._auth.user.status === UserStatus.New) {
        this._notificationService.success('T_SUCCESS_NEW_USER_SAVED');
      } else {
        this._notificationService.success('T_SUCCESS_NEW_USER_BY_INVITE');
      }
    }, error => this._notificationService.error('T_ERROR_AGREEMENT'));
  }

  public goBack(): void {
    this._router.navigateByUrl(this._routerHistoryService.previousUrl);
  }
}
