import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileImageCropComponent } from './profile-image-crop.component';
import { UserGroupsComponent } from './user-groups.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserProfileImageCropComponent,
    UserGroupsComponent
  ],
  exports: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserProfileImageCropComponent,
    UserGroupsComponent
  ]
})
export class UserProfileModule {
}

