import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileComponent } from './user-profile.component';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes> [{
      path: '',
      component: UserProfileComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'edit',
      component: UserProfileFormComponent,
      breadcrumb: 'T_PROFILE_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
