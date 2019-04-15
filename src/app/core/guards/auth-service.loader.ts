import { from as observableFrom, of as observableOf, Observable } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountModel } from '../models/account-model';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthServiceLoader implements CanActivate {
  private _isLoading: Observable<boolean>;

  constructor(private _accountService: AccountService,
              private _authService: AuthService,
              private _router: Router) {
  }

  public canActivate(): any {
    if (!this._authService.isLoggedIn) {
      this._router.navigate(['/login']);
      return observableOf(false);
    }

    if (this._authService.user) {
      return observableFrom([true]);
    }
    return this._load();
  }

  private _load() {
    if (!this._isLoading) {
      this._isLoading = this._accountService.get(this._authService.token)
        .pipe(
          map((user: AccountModel) => {
            this._authService.user = user;
            this._isLoading = null;
            return true;
          }),
          share()
        );
    }

    return this._isLoading;
  }
}
