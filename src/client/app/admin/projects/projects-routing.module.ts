import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminProjectListComponent } from './project-list.component';
import { AdminProjectFormComponent } from './project-form.component';
import { AdminProjectDetailsComponent } from './project-details.component';
import { AdminProjectRelationDetailsComponent } from './project-relation-details.component';
import { AdminProjectRelationFormComponent } from './project-relation-form.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminProjectListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: AdminProjectFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminProjectDetailsComponent,
      breadcrumb: 'T_PROJECT_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminProjectFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }, {
      path: ':projectId/relations',
      breadcrumbIgnore: true,
      children: [{
        path: 'create',
        component: AdminProjectRelationFormComponent,
        breadcrumb: 'T_PROJECT_RELATION_CREATE',
      }, {
        path: ':id',
        component: AdminProjectRelationDetailsComponent,
        breadcrumb: 'T_PROJECT_RELATION_DETAILS',
      }, {
        path: ':id/edit',
        component: AdminProjectRelationFormComponent,
        breadcrumb: 'T_PROJECT_RELATION_EDIT',
      }]
    }])
  ],
  exports: [RouterModule]
})
export class AdminProjectsRoutingModule {
}
