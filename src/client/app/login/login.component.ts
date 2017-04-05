import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  moduleId: module.id,
  selector: 'bs-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(protected _loginService: LoginService) {
  }

  public login(provider: string) {
    this._loginService.login(provider);
  }
}
