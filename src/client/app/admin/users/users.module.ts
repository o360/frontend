import { SharedModule } from '../../shared/shared.module';
import { AdminUsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';
import { UserGroupListComponent } from './user-group-list.component';

@NgModule({
  imports: [
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserGroupListComponent
  ],
  exports: [
    AdminUserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserGroupListComponent
  ]
})
export class AdminUsersModule {
}

