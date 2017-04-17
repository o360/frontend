import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';
import { AccountModel } from '../models/account-model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._authServiceLoader.canActivate().subscribe(() => {
      if (this._authService.isLoggedIn) {
        if (this._authService.user.status === 'new') {
          this._router.navigate(['/new']);
          return false;
        } else {
          return true;
        }
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    });
    return true;
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
