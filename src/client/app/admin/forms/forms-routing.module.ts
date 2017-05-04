import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormListComponent } from './form-list.component';
import { FormBuilderComponent } from './form-builder.component';
import { FormDetailsComponent } from './form-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: FormListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'create',
      component: FormBuilderComponent,
      data: { breadcrumb: 'T_ACTION_CREATE' },
    }, {
      path: ':id',
      component: FormDetailsComponent,
      data: { breadcrumb: 'T_FORM_DETAILS' },
    }, {
      path: ':id/edit',
      component: FormBuilderComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
