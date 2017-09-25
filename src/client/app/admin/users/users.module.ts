import { SharedModule } from '../../shared/shared.module';
import { AdminUsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { AdminUserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { AdminUserFormComponent } from './user-form.component';
import { AdminUserGroupListComponent } from './user-group-list.component';
import { AdminUserConfirmationComponent } from './user-confirmation.component';

@NgModule({
  imports: [
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminUserGroupListComponent,
    AdminUserConfirmationComponent
  ],
  exports: [
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminUserGroupListComponent,
    AdminUserConfirmationComponent
  ]
})
export class AdminUsersModule {
}

