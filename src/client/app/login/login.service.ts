import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptions } from '@angular/http';

const apiUrl = 'http://sop-ci.z1.netpoint-dc.com:9000/api/v1.0';

@Injectable()
export class LoginService {
  protected _clientId: string;
  protected _authorizationUrlBase: string;
  protected _redirectUri: string;
  protected _scope: string;

  protected _isAuthenticated: boolean = false;
  protected _code: string;
  protected _token: string;

  constructor(protected _http: Http) {
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
    console.log(url);
    let w = window.open(url, 'oauth', 'width=500,height=400');
  }

  public getToken(provider: string, code: string) {
    let url = apiUrl + '/auth/' + provider;
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    let body = JSON.stringify({ 'code': code });

    this._http.post(url, body, { headers: headers })
      .subscribe(data => {
        this._token = data.json().token;
      });
  }
}
