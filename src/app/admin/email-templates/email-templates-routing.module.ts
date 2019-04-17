import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminEmailTemplateListComponent } from './email-template-list.component';
import { AdminEmailTemplateFormComponent } from './email-template-form.component';
import { AdminEmailTemplateDetailsComponent } from './email-template-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminEmailTemplateListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: AdminEmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminEmailTemplateDetailsComponent,
      breadcrumb: 'T_EMAIL_TEMPLATE_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminEmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminEmailTemplatesRoutingModule {
}
