import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../shared/config/env.config';
import { UserModel } from '../models/user-model';

export const tokenLsKey = 'token';

@Injectable()
export class AuthService {
  private _token: string;
  private _user: UserModel;

  public get token(): string {
    return this._token;
  }

  public get user(): UserModel {
    return this._user;
  }

  public set user(value: UserModel) {
    this._user = value;
  }

  public get isLoggedIn() {
    return !!this._token;
  }

  constructor(protected _router: Router) {
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
    let providerConfig = Config.PROVIDERS[oauthProvider];

    let urlParams = Object.entries(providerConfig.getParams).map(([key, value]) => {
      return `${key}=${encodeURIComponent(value)}`;
    });

    window.location.href = `${providerConfig.authorizationUrlBase}?${urlParams.join('&')}`;
  }

  public logout() {
    localStorage.removeItem(tokenLsKey);
    this._router.navigate(['/login']);
  }
}
