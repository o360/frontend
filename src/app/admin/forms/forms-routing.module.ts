import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFormListComponent } from './form-list.component';
import { AdminFormBuilderComponent } from './form-builder.component';
import { AdminFormDetailsComponent } from './form-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminFormListComponent,
      breadcrumbIgnore: true
    }, {
      path: 'create',
      component: AdminFormBuilderComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminFormDetailsComponent,
      breadcrumb: 'T_FORM_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminFormBuilderComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminFormsRoutingModule {
}
