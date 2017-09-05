import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AgreementRoutingModule } from './agreement-routing.module';
import { AgreementComponent } from './agreement.component';
import { AgreementViewComponent } from './agreement-view.component';

@NgModule({
  imports: [
    AgreementRoutingModule,
    SharedModule
  ],
  exports: [
    AgreementComponent,
    AgreementViewComponent
  ],
  declarations: [
    AgreementComponent,
    AgreementViewComponent
  ]
})
export class AgreementModule {
}

