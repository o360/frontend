import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    UsersRoutingModule,
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
export class UsersModule {
}

