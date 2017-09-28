import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

export const inviteCode = 'inviteCode';

@Component({
  moduleId: module.id,
  selector: 'bs-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(protected _authService: AuthService,
              protected _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.forEach((params: Params) => {
      let code = params['code'];
      if (code) {
        localStorage.setItem(inviteCode, code);
      }
    });
    this._authService.logout();
  }

  public login(provider: string) {
    this._authService.login(provider);
  }
}
