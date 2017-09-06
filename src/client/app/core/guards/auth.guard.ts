import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserStatus } from '../models/user-model';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authServiceLoader.canActivate().map(() => {
      if (this._authService.isLoggedIn) {
        if (this._authService.user.status === UserStatus.New && !this._authService.profileFilled) {
            this._router.navigate(['/new']);
            return false;
        }
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    });
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
