import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: UserProfileComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'edit',
      component: UserProfileFormComponent,
      data: { breadcrumb: 'T_PROFILE_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
