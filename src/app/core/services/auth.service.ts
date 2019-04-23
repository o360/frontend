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
