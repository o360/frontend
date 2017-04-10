import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';

const apiUrl = 'http://sop-ci.z1.netpoint-dc.com:9000/api/v1.0';

@Injectable()
export class AuthenticationService {
  protected _clientId: string;
  protected _authorizationUrlBase: string;
  protected _redirectUri: string;
  protected _scope: string;

  protected _token: string;
  protected _user: UserModel = new UserModel();

  protected _isLoggedIn: boolean = false;

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  public get user(): UserModel {
    return this._user;
  }

  constructor(protected _http: Http,
              protected _router: Router) {
  }

  public login(provider: string) {
    if (provider === 'google') {
      this._clientId = '183984693644-rrf60igolgdvtmdq5oue0opi3jvq4vl8.apps.googleusercontent.com';
      this._authorizationUrlBase = 'https://accounts.google.com/o/oauth2/auth';
      this._redirectUri = 'http://localhost:5555/google';
      this._scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    }
    let url = this._authorizationUrlBase;
    url += '?response_type=code'
      + '&redirect_uri=' + encodeURIComponent(this._redirectUri)
      + '&client_id=' + encodeURIComponent(this._clientId)
      + '&scope=' + encodeURIComponent(this._scope);
    window.location.href = url;
  }

  public auth(provider: string, code: string) {
    let url = apiUrl + '/auth/' + provider;

    let body = JSON.stringify({ 'code': code });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(url, body, options)
      .subscribe(data => {
        let token = data.json().token;
        if (token) {
          this._token = token;
          localStorage.token = token;
        }
        this.getUser(this._token);
      });
  }

  public getUser(token: string) {
    let url = apiUrl + '/auth';

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Auth-Token', token);
    let options = new RequestOptions({ headers: headers });

    this._http.get(url, options)
      .subscribe(response => {
        let user = response.json();
        if (user) {
          this._isLoggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.getCurrentUser();
          this._router.navigate(['']);
        } else {
          this._isLoggedIn = false;
          this._router.navigate(['/login']);
        }
      });
  }

  public getCurrentUser() {
    this._user = JSON.parse(localStorage.currentUser);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._isLoggedIn = false;
    this._router.navigate(['/login']);
  }
}
