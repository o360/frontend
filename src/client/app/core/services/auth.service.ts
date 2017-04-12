import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../shared/config/env.config';

@Injectable()
export class AuthService {

  constructor(protected _router: Router) {
  }

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  public login(oauthProvider: string) {
    let providerConfig = Config.PROVIDERS[oauthProvider];

    let urlParams = Object.entries(providerConfig.getParams).map(([key, value]) => {
      return `${key}=${encodeURIComponent(value)}`;
    });

    let url = `${providerConfig.authorizationUrlBase}?${urlParams.join('&')}`;
    window.location.href = url;
  }


  public logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
