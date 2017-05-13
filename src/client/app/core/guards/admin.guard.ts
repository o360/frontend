import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceLoader } from './auth-service.loader';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user-model';

@Injectable()
export class AdminGuard implements CanActivate {
  protected _adminRights: boolean;

  public get adminRights(): boolean {
    return this._adminRights;
  }

  constructor(protected _router: Router,
              protected _authService: AuthService,
              protected _authServiceLoader: AuthServiceLoader) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authServiceLoader.canActivate().map(() => {
      if (this._authService.isLoggedIn) {
        if (this._authService.user.role === UserRole.Admin) {
          this._adminRights = true;
        } else {
          this._router.navigate(['/']);
          this._adminRights = false;
        }
      } else {
        this._router.navigate(['/login']);
        this._adminRights = false;
      }

      return this._adminRights;
    });
  }

}
