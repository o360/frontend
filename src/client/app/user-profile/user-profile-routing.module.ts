import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
        path: '',
        component: UserProfileComponent,
        data: { breadcrumbIgnore: true },
      },{
        path: 'edit',
        component: UserProfileEditComponent,
        data: { breadcrumb: 'T_PROFILE_EDIT' },
      }])
  ],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
