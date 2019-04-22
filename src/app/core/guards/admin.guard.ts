import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authServiceLoader.canActivate()
      .pipe(
        map(() => {
          if (this._authService.isLoggedIn) {
            if (this._authService.isAdmin) {
              return true;
            }
            this._router.navigate(['/']);
            return false;

          }
          this._router.navigate(['/login']);
          return false;
        })
      );
  }
}
