import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../core/models/app-routes.model';
import { AgreementComponent } from './agreement.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AgreementComponent
    }])
  ],
  exports: [RouterModule]
})
export class AgreementRoutingModule {
}
