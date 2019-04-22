import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserPublicProfileComponent } from './user-public-profile.component';
import { UserProfileModule } from '../user-profile/user-profile.module';

@NgModule({
  imports: [
    UsersRoutingModule,
    UserProfileModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserPublicProfileComponent
  ],
  exports: [
    UserListComponent,
    UserPublicProfileComponent
  ]
})
export class UsersModule {
}
