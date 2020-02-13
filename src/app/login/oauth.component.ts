/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OAuthService } from '../core/services/oauth.service';
import { AuthService } from '../core/services/auth.service';
import { InviteService } from '../core/services/invite.service';

@Component({
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

        this._oAuthService.authenticate(provider, code).subscribe((token) => {
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
