import { NgModule } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileEditComponent } from './user-profile-edit.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileEditComponent,
  ],
  providers: [
    UserService
  ],
  exports: [
    UserProfileComponent,
    UserProfileEditComponent
  ]
})
export class UserProfileModule {
}

