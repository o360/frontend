import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';
import { UserGroupListComponent } from './user-group-list.component';

@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserGroupListComponent
  ],
  exports: [
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserGroupListComponent
  ]
})
export class UsersModule {
}

