import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authServiceLoader.canActivate().map(() => {
      if (this._authService.isLoggedIn) {
        if (this._authService.isAdmin) {
          return true;
        } else {
          this._router.navigate(['/']);
          return false;
        }
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    });
  }
}
