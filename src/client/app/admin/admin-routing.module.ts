import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    RouterModule.forChild(([{
      path: 'users',
      data: { breadcrumb: 'T_USERS' },
      loadChildren: () => UserModule
    }]))
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
