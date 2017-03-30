import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
// import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { UserService } from '../shared/services/user.service';
import { UserRoutingModule, routedComponents } from './user-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    UserRoutingModule,
    // CommonModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    routedComponents
  ],
  providers: [
    UserService
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }

