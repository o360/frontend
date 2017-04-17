import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewAccountComponent } from './new-account.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: NewAccountComponent
    }])
  ],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
