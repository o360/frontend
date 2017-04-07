import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

const apiUrl = 'http://sop-ci.z1.netpoint-dc.com:9000/api/v1.0';

@Injectable()
export class AuthenticationService {
  protected _clientId: string;
  protected _authorizationUrlBase: string;
  protected _redirectUri: string;
  protected _scope: string;

  protected _returnUrl: string;

  protected _code: string;
  protected _token: string;
  private _isLoggedIn: boolean = false;


  public get returnUrl(): string {
    return this._returnUrl;
  }

  public set returnUrl(value: string) {
    this._returnUrl = value;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  constructor(protected _http: Http,
              protected _router: Router,
              protected _activatedRoute: ActivatedRoute) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._token = currentUser && currentUser.token;
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
    window.open(url, 'oauth', 'width=500,height=400');
  }

  public getCode() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this._code = params['code'];
    });
    console.log('Code: ', this._code);
    this.getToken('google', this._code);
    this._router.navigate([this._returnUrl]);
  }

  public getToken(provider: string, code: string) {
    let url = apiUrl + '/auth/' + provider;
    let body = JSON.stringify({ 'code': code });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url, body, options)
      .subscribe(response => {
      let token = response.json() && response.json().token;
      if (token) {
        this._token = token;
        this.getUser(this._token);
      }
    });
  }

  public getUser(token: string) {
    let url = apiUrl + '/auth';
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Auth-Token', token);
    let options = new RequestOptions({ headers: headers });
    this._http.get(url, options).subscribe(response => {
      let user = response.json();
      if (user) {
        this._isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        this._isLoggedIn = false;
      }
      parent.close();
    });
  }

  public logout() {
    this._token = null;
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
}
