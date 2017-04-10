import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  template: `<p>Logging</p>`
})
export class OAuthComponent implements OnInit {
  protected _code: string;

  constructor(protected _authenticationService: AuthenticationService, protected _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this._code = params['code'];
    });
    this._authenticationService.auth('google', this._code);
  }
}
