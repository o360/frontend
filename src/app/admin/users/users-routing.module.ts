import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminUserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { AdminUserFormComponent } from './user-form.component';
import { AppRoutes } from '../../core/models/app-routes.model';
import { AdminUserInviteListComponent } from './user-invite-list.component';
import { AdminUserInviteFormComponent } from './user-invite-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminUserListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'invites',
      component: AdminUserInviteListComponent,
      breadcrumb: 'T_INVITES',
    }, {
      path: 'invites/send',
      component: AdminUserInviteFormComponent,
      breadcrumb: 'T_ACTION_INVITE',
    }, {
      path: ':id',
      component: AdminUserDetailsComponent,
      breadcrumb: 'T_USER_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminUserFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {
}
