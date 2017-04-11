import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  template: `<p>Logging</p>`
})
export class OAuthComponent implements OnInit {
  constructor(protected _authService: AuthService,
              protected _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._activatedRoute.params.forEach((params: Params) => {
      let provider = params['provider'];

      this._activatedRoute.queryParams.forEach((params: Params) => {
        let code = params['code'];
        this._authService.authenticate(provider, code);
      });
    });
  }
}
