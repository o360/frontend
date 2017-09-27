import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OAuthService } from '../core/services/oauth.service';
import { AuthService } from '../core/services/auth.service';
import { InviteService } from '../core/services/invite.service';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  templateUrl: 'oauth.component.html'
})
export class OAuthComponent implements OnInit {
  constructor(protected _oAuthService: OAuthService,
              protected _authService: AuthService,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router,
              protected _inviteService: InviteService) {
  }

  public ngOnInit(): void {
    this._activatedRoute.params.forEach((params: Params) => {
      let provider = params['provider'];

      this._activatedRoute.queryParams.forEach((params: Params) => {
        let code = params['code'];

        this._inviteService.asseptInvite({ code }).subscribe();

        this._oAuthService.authenticate(provider, code).subscribe(token => {
          if (token) {
            this._authService.saveToken(token);
            this._router.navigate(['/']);
          } else {
            this._router.navigate(['/login']);
          }
        });
      });
    });
  }
}
