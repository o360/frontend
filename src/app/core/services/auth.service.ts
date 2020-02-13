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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModel } from '../models/account-model';
import { UserRole } from '../models/user-model';
import { ConfigurationService } from './configuration.service';

export const tokenLsKey = 'token';

@Injectable()
export class AuthService {
  private _token: string;
  private _user: AccountModel;

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public get user(): AccountModel {
    return this._user;
  }

  public set user(value: AccountModel) {
    this._user = value;
  }

  public get isLoggedIn() {
    return !!this._token;
  }

  public get isAdmin() {
    return this._user.role === UserRole.Admin;
  }

  constructor(protected _router: Router,
              private _configService: ConfigurationService) {
    this.updateToken();
  }

  public saveToken(token: string) {
    localStorage.setItem(tokenLsKey, token);
    this.updateToken();
  }

  public updateToken() {
    this._token = localStorage[tokenLsKey];
  }

  public login(oauthProvider: string) {
    let providerConfig = this._configService.config.PROVIDERS[oauthProvider];
    let urlParams = Object.entries(providerConfig.getParams).map(([key, value]) => {
      return `${key}=${encodeURIComponent(value.toString())}`;
    });
    window.location.href = `${providerConfig.authorizationUrlBase}?${urlParams.join('&')}`;
  }

  public logout() {
    localStorage.removeItem(tokenLsKey);
    this._router.navigate(['/login']);
  }
}
