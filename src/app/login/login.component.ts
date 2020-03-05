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

import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService, } from '../core/services/auth.service';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  authProvider,
  OAuthService
} from '../core/services/oauth.service';

export const inviteCode = 'inviteCode';

@Component({
  selector: 'bs-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public socialProviders = [
    {
      key: authProvider.GOOGLE,
      name: 'Google',
      icon: 'fa-google',
      buttonClass: 'button-google',
    },
    {
      key: authProvider.FACEBOOK,
      name: 'Facebook',
      icon: 'fa-facebook-f',
      buttonClass: 'button-facebook',
    },
    {
      key: authProvider.VK,
      name: 'VK',
      icon: 'fa-vk',
      buttonClass: 'button-vk',

    },
  ];
  public availableSocialProviders = [];
  public credentialsLoginAvailable = false;
  public username: string;
  public password: string;
  public loginUnsuccessful = false;

  constructor(private _authService: AuthService,
              private _oAuthService: OAuthService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.forEach((params: Params) => {
      let code = params['code'];
      if (code) {
        localStorage.setItem(inviteCode, code);
      }
    });
    this._authService.logout();
  }

  public ngOnInit(): void {
    this._oAuthService.listAvailableProviders().subscribe(
      (providers: authProvider[]) => {
        this.credentialsLoginAvailable = providers.includes(authProvider.CREDENTIALS);
        this.availableSocialProviders = this.socialProviders.filter(provider => providers.includes(provider.key));
      }
    );
  }

  public loginWithCredentials() {

    this._authService.loginWithCredentials(this.username, this.password).subscribe(
      (token) => {
        if (token) {
          this._authService.saveToken(token);
          this._router.navigate(['/']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.loginUnsuccessful = true;
        }
      }
      );
  }

  public resetFormValidity() {
    this.loginUnsuccessful = false;
  }

  public login(provider: authProvider) {
    this._authService.login(provider);
  }
}
