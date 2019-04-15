import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewAccountComponent } from './new-account.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    SharedModule
  ],
  exports: [
    NewAccountComponent
  ],
  declarations: [
    NewAccountComponent
  ]
})
export class RegistrationModule {
}
