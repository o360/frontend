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

import { from as observableFrom, Observable, of as observableOf } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountModel } from '../models/account-model';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthServiceLoader implements CanActivate {
  private _isLoading: Observable<boolean>;

  constructor(private _accountService: AccountService,
              private _authService: AuthService,
              private _router: Router) {
  }

  public canActivate(): any {
    if (!this._authService.isLoggedIn) {
      this._router.navigate(['/login']);

      return observableOf(false);
    }

    if (this._authService.user) {
      return observableFrom([true]);
    }

    return this._load();
  }

  private _load() {
    if (!this._isLoading) {
      this._isLoading = this._accountService.get(this._authService.token)
        .pipe(
          map((user: AccountModel) => {
            this._authService.user = user;
            this._isLoading = null;

            return true;
          }),
          share()
        );
    }

    return this._isLoading;
  }
}
