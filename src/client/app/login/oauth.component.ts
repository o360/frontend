import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({ moduleId: module.id, selector: 'bs-oauth', template: `<h1>Logging</h1>` })

export class OAuthComponent implements OnInit {
  protected _code: string;

  constructor(protected _authenticationService: AuthenticationService,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router) {
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this._code = params['code'];
      console.log('Your code: ', this._code);
    });
    this._authenticationService.getToken('google', this._code);
  }
}

