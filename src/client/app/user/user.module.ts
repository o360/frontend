import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent
  ],
  exports: [
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent
  ]
})
export class UserModule {
}

