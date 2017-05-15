import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap';
import { AuthGuard } from '../../guards/auth.guard';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'bs-sidebar-nav',
  templateUrl: 'sidebar-nav.component.html',
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class SidebarNavComponent {
  protected _adminRights: boolean;

  public get adminRights(): boolean {
    return this._adminRights;
  }

  constructor(protected _authGuard: AuthGuard) {
    this._adminRights = this._authGuard.adminRights;
  }
}
