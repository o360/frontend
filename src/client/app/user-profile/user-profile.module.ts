import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileImageCropComponent } from './profile-image-crop.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserProfileImageCropComponent
  ],
  exports: [
    UserProfileComponent,
    UserProfileFormComponent,
    UserProfileImageCropComponent
  ]
})
export class UserProfileModule {
}

