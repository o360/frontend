import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewAccountComponent } from './new-account.component';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: NewAccountComponent
    }])
  ],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
