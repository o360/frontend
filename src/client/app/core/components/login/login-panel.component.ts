import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'bs-login-panel',
  template: ``
  // templateUrl: 'login-panel.component.html'
})
export class LoginPanelComponent {

  constructor(public authService: AuthService) {
  }

  public logout() {
    this.authService.logout();
  }
}
