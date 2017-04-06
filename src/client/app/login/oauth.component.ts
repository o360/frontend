import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { LoginService } from './login.service';

const apiURL = 'http://sop-ci.z1.netpoint-dc.com:9000/api/v1.0';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  template: `<h1>Logging</h1>`
})
export class OAuthComponent implements OnInit {
  protected _code: string;

  constructor(protected _loginService: LoginService, protected _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this._code = params['code'];
      console.log('Your code: ', this._code);
    });
    this._loginService.auth('google', this._code);
  }
}
