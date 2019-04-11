import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { AdminEmailTemplateFormComponent } from './email-template-form.component';
import { AdminEmailTemplateListComponent } from './email-template-list.component';
import { AdminEmailTemplatesRoutingModule } from './email-templates-routing.module';
import { AdminEmailTemplateDetailsComponent } from './email-template-details.component';

@NgModule({
  imports: [
    AdminEmailTemplatesRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminEmailTemplateListComponent,
    AdminEmailTemplateFormComponent,
    AdminEmailTemplateDetailsComponent
  ],
  exports: [
    AdminEmailTemplateListComponent,
    AdminEmailTemplateFormComponent,
    AdminEmailTemplateDetailsComponent
  ]
})
export class AdminEmailTemplatesModule {
}
