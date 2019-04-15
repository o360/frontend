import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileFormComponent
  ],
  exports: [
    UserProfileComponent,
    UserProfileFormComponent
  ]
})
export class UserProfileModule {
}
