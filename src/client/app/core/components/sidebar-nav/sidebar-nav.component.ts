import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap';
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
}
