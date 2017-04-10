import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { UserFormComponent } from './user-form.component';
import { UserListComponent } from './user-list.component';
import { AuthGuard } from '../core/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'users',
      canActivate: [AuthGuard],
      data: { breadcrumb: 'T_USERS' },
      children: [{
        path: '',
        component: UserListComponent,
        data: { breadcrumbIgnore: true },
      }, {
        path: 'create',
        component: UserFormComponent,
        data: { breadcrumb: 'T_ACTION_CREATE' },
      }, {
        path: ':id',
        component: UserDetailsComponent,
        data: { breadcrumb: 'T_USER_DETAILS' },
      }, {
        path: ':id/edit',
        component: UserFormComponent,
        data: { breadcrumb: 'T_ACTION_EDIT' },
      }]
    }])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
