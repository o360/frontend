import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { UserFormComponent } from './user-form.component';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
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
    }])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
