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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserStatus } from '../models/user-model';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authServiceLoader.canActivate()
      .pipe(
        map(() => {
          if (this._authService.isLoggedIn) {
            if (this._authService.user.status === UserStatus.New && !this._authService.user.isFilled) {
              this._router.navigate(['/new']);

              return false;
            }
            if (!this._authService.user.termsApproved) {
              this._router.navigate(['/agreement']);

              return false;
            }

            return true;
          }
          this._router.navigate(['/login']);

          return false;
        })
      );
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
