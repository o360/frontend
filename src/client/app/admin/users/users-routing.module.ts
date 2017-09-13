import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminUserListComponent,
      breadcrumbIgnore: true,
    }, {
      path: ':id',
      component: UserDetailsComponent,
      breadcrumb: 'T_USER_DETAILS',
    }, {
      path: ':id/edit',
      component: UserFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {
}
