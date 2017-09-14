import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserGroupsComponent } from './user-groups.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserGroupsComponent
  ],
  exports: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserGroupsComponent
  ]
})
export class UserProfileModule {
}

