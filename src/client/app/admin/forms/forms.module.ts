import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormListComponent } from './form-list.component';
import { FormBuilderComponent } from './form-builder.component';
import { FormDetailsComponent } from './form-details.component';
import { FormBuilderElementComponent } from './form-element.component';

@NgModule({
  imports: [
    SharedModule,
    FormsRoutingModule
  ],
  declarations: [
    FormListComponent,
    FormBuilderComponent,
    FormDetailsComponent,
    FormBuilderElementComponent
  ],
  exports: [
    FormListComponent,
    FormBuilderComponent,
    FormDetailsComponent,
    FormBuilderElementComponent
  ],
})
export class FormsModule {
}
