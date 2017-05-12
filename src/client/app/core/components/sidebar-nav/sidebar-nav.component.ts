import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap';
import { AdminGuard } from '../../guards/admin.guard';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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

  constructor(protected _adminGuard: AdminGuard) {
    this._adminRights = this._adminGuard.adminRights;
  }
}
