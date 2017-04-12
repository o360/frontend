import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountModel } from '../models/account-model';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';


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
      return Observable.of(false);
    }

    if (this._authService.user) {
      return Observable.from([true]);
    } else {
      return this._load();
    }
  }

  private _load() {
    if (!this._isLoading) {
      this._isLoading = this._accountService.get(this._authService.token)
        .map((user: AccountModel) => {
          this._authService.user = user;
          if (this._authService.isNewAccount) {
            this._router.navigate(['/new']);
            return false;
          } else {
            this._isLoading = null;
          }
          return true;
        }).share();
    }

    return this._isLoading;
  }
}
