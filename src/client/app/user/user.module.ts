import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [UserListComponent],
  providers: [UserService],
  exports: [UserListComponent,
    CommonModule, FormsModule, RouterModule]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      // providers: [NameListService]
    };
  }
}
//
// import { NgModule } from '@angular/core';
// import { HomeComponent } from './home.component';
// import { HomeRoutingModule } from './home-routing.module';
// import { SharedModule } from '../shared/shared.module';
// import { NameListService } from '../shared/name-list/name-list.service';
//
// @NgModule({
//   imports: [HomeRoutingModule, SharedModule],
//   declarations: [HomeComponent],
//   exports: [HomeComponent],
//   providers: [NameListService]
// })
// export class HomeModule { }
