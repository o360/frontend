import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormListComponent } from './form-list.component';
import { FormBuilderComponent } from './form-builder.component';
import { FormDetailsComponent } from './form-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: FormListComponent,
      breadcrumbIgnore: true
    }, {
      path: 'create',
      component: FormBuilderComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: FormDetailsComponent,
      breadcrumb: 'T_FORM_DETAILS',
    }, {
      path: ':id/edit',
      component: FormBuilderComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
