import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailTemplateListComponent } from './email-template-list.component';
import { EmailTemplateFormComponent } from './email-template-form.component';
import { EmailTemplateDetailsComponent } from './email-template-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: EmailTemplateListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: EmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: EmailTemplateDetailsComponent,
      breadcrumb: 'T_EMAIL_TEMPLATE_DETAILS',
    }, {
      path: ':id/edit',
      component: EmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class EmailTemplatesRoutingModule {
}
