import { SharedModule } from '../../shared/shared.module';
import { AdminUsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { AdminUserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { AdminUserFormComponent } from './user-form.component';
import { AdminUserGroupListComponent } from './user-group-list.component';
import { AdminUserInviteFormComponent } from './user-invite-form.component';
import { AdminUserInviteListComponent } from './user-invite-list.component';
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
    AdminUserInviteListComponent,
    AdminUserInviteFormComponent,
    AdminUserConfirmationComponent
  ],
  exports: [
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminUserGroupListComponent,
    AdminUserInviteListComponent,
    AdminUserInviteFormComponent,
    AdminUserConfirmationComponent
  ]
})
export class AdminUsersModule {
}

