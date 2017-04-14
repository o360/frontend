import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    UserListComponent
    // UserDetailsComponent,
  ],
  exports: [
    UserListComponent
    // UserDetailsComponent,
  ]
})
export class AdminModule {
}
