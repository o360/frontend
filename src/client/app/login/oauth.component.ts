import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AccountService } from '../core/services/account.service';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  templateUrl: 'oauth.component.html'
})
export class OAuthComponent implements OnInit {
  constructor(protected _accountService: AccountService,
              protected _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._activatedRoute.params.forEach((params: Params) => {
      let provider = params['provider'];

      this._activatedRoute.queryParams.forEach((params: Params) => {
        let code = params['code'];
        this._accountService.authenticate(provider, code);
      });
    });
  }
}
