import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Config } from '../../shared/config/env.config';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';

@Injectable()
export class AccountService {
  protected _apiUrl: string = Config.API;
  protected _user: UserModel = new UserModel();

  public get user(): UserModel {
    return this._user;
  }
  constructor(protected _http: Http, protected _router: Router) {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    if (localStorage.getItem('token')) {
      this.getUser(localStorage.getItem('token'));
    }
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
          localStorage.setItem('token', token);
          this.getUser(token);
        } else {
          this._router.navigate(['/login']);
        }
      });
  }

  public getUser(token: string) {
    let url = `${ this._apiUrl }/auth`;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Auth-Token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
      .subscribe((response) => {
        let user = response.json();
        if (user) {
          this._user = user;
          this._router.navigate(['']);
        }
      });
  }
}
