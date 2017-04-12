import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { Config } from '../../shared/config/env.config';

@Injectable()
export class AuthService {

  protected _apiUrl: string = Config.API;
  protected _token: string;
  protected _params: any;
  protected _user: UserModel = new UserModel();

  public get user(): UserModel {
    return this._user;
  }

  constructor(protected _http: Http, protected _router: Router) {
  }

  public getCurrentUser() {
    this._user = JSON.parse(localStorage.getItem('currentUser'));
    return this._user;
  }

  public isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.getCurrentUser();
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

  public authenticate(provider: string, code: string) {
    let url = `${ this._apiUrl }/auth/${ provider }`;
    let body = JSON.stringify({ 'code': code });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url, body, options)
      .subscribe(data => {
        let token = data.json().token;
        if (token) {
          this._token = token;
        } else {
          this._router.navigate(['/login']);
        }
        this.getUser(this._token).subscribe(
          data => {
            this._router.navigate(['']);
          },
          error => {
            this._router.navigate(['/login']);
          }
        );
      });
  }

  public getUser(token: string) {
    let url = `${ this._apiUrl }/auth`;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Auth-Token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
      .map((response) => {
        let user = response.json();
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.getCurrentUser();
        }
      });
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
}
