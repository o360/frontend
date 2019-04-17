import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap';
import { AuthService } from '../../services/auth.service';
/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'bs-sidebar-nav',
  templateUrl: 'sidebar-nav.component.html',
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class SidebarNavComponent {
  protected _isAdmin: boolean;

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  constructor(protected _authService: AuthService) {
    this._isAdmin = this._authService.isAdmin;
  }
}
