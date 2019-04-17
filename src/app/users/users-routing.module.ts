import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../core/models/app-routes.model';
import { UserListComponent } from './user-list.component';
import { UserPublicProfileComponent } from './user-public-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes> [{
      path: '',
      component: UserListComponent,
      breadcrumbIgnore: true,
    }, {
      path: ':id',
      component: UserPublicProfileComponent,
      breadcrumb: 'T_USER_DETAILS',
    }])
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
