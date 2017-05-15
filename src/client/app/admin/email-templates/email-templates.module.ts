import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { EmailTemplateFormComponent } from './email-template-form.component';
import { EmailTemplateListComponent } from './email-template-list.component';
import { EmailTemplatesRoutingModule } from './email-templates-routing.module';
import { EmailTemplateDetailsComponent } from './email-template-details.component';

@NgModule({
  imports: [
    EmailTemplatesRoutingModule,
    SharedModule,
  ],
  declarations: [
    EmailTemplateListComponent,
    EmailTemplateFormComponent,
    EmailTemplateDetailsComponent
  ],
  exports: [
    EmailTemplateListComponent,
    EmailTemplateFormComponent,
    EmailTemplateDetailsComponent
  ]
})
export class EmailTemplatesModule {
}
