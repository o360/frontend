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
import { authProvider } from './oauth.service';
import {
  filter,
  map
} from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

export const tokenLsKey = 'token';

@Injectable()
export class AuthService {
  private _token: string;
  private _user: BehaviorSubject<AccountModel> = new BehaviorSubject(undefined);

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public get user(): AccountModel {
    return this._user.value;
  }

  public set user(value: AccountModel) {
    this._user.next(value);
  }

  public get user$(): Observable<AccountModel> {
    return this._user.asObservable().pipe(filter(user => user !== undefined));
  }

  public get isLoggedIn() {
    return !!this._token;
  }

  public get isAdmin() {
    return this._user.value.role === UserRole.Admin;
  }

  constructor(protected _router: Router,
              private _http: HttpClient,
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

  public login(oauthProvider: authProvider) {
    let providerConfig = this._configService.config.PROVIDERS[oauthProvider];
    let urlParams = Object.entries(providerConfig.getParams).map(([key, value]) => {
      return `${key}=${encodeURIComponent(value.toString())}`;
    });
    window.location.href = `${providerConfig.authorizationUrlBase}?${urlParams.join('&')}`;
  }

  public loginWithCredentials(username: string, password: string) {
    let body = JSON.stringify({
      username,
      password,
    });
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    });
    let url = `${this._configService.config.API}/auth-creds`;

    return this._http.post(url, body, { headers })
      .pipe(
        map((json: any) => <string> json['token'])
      );
  }

  public logout() {
    localStorage.removeItem(tokenLsKey);
    this._router.navigate(['/login']);
  }
}
