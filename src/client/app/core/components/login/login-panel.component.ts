import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'bs-login-panel',
  templateUrl: 'login-panel.component.html'
})
export class LoginPanelComponent {

  constructor(protected _route: ActivatedRoute,
              protected _router: Router,
              public authenticationService: AuthenticationService) {
    this.authenticationService.logout();
    this.authenticationService.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this._router.navigate(['/login']);
  }
}
