import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailTemplateListComponent } from './email-template-list.component';
import { EmailTemplateFormComponent } from './email-template-form.component';
import { EmailTemplateDetailsComponent } from './email-template-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: EmailTemplateListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'create',
      component: EmailTemplateFormComponent,
      data: { breadcrumb: 'T_ACTION_CREATE' },
    }, {
      path: ':id',
      component: EmailTemplateDetailsComponent,
      data: { breadcrumb: 'T_EMAIL_TEMPLATE_DETAILS' },
    }, {
      path: ':id/edit',
      component: EmailTemplateFormComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class EmailTemplatesRoutingModule {
}
