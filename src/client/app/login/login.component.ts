import { Component } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'bs-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(protected _authenticationService: AuthenticationService) {
    this._authenticationService.logout();
  }

  public login(provider: string) {
    this._authenticationService.login(provider);
  }
}
