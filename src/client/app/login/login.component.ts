import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'bs-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(protected _authService: AuthService) {
    this._authService.logout();
  }

  public login(provider: string) {
    this._authService.login(provider);
  }
}
