import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminFormsRoutingModule } from './forms-routing.module';
import { AdminFormListComponent } from './form-list.component';
import { AdminFormBuilderComponent } from './form-builder.component';
import { AdminFormDetailsComponent } from './form-details.component';
import { AdminFormBuilderElementComponent } from './form-element.component';

@NgModule({
  imports: [
    SharedModule,
    AdminFormsRoutingModule
  ],
  declarations: [
    AdminFormListComponent,
    AdminFormBuilderComponent,
    AdminFormDetailsComponent,
    AdminFormBuilderElementComponent
  ],
  exports: [
    AdminFormListComponent,
    AdminFormBuilderComponent,
    AdminFormDetailsComponent,
    AdminFormBuilderElementComponent
  ],
})
export class AdminFormsModule {
}
