import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'users',
      data: { breadcrumb: 'T_USERS' },
      loadChildren: () => UsersModule
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
