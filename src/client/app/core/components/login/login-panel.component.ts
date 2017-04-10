import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user-model';

@Component({
  moduleId: module.id,
  selector: 'bs-login-panel',
  template: ``
  // templateUrl: 'login-panel.component.html'
})
export class LoginPanelComponent {

  constructor(public authenticationService: AuthenticationService) {
  }

  public logout() {
    this.authenticationService.logout();
  }
}
