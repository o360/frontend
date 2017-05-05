import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectRelationDetailsComponent } from './project-relation-details.component';
import { ProjectRelationFormComponent } from './project-relation-form.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: ProjectListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: ProjectFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: ProjectDetailsComponent,
      breadcrumb: 'T_PROJECT_DETAILS',
    }, {
      path: ':id/edit',
      component: ProjectFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }, {
      path: ':projectId/relations',
      breadcrumbIgnore: true,
      children: [{
        path: 'create',
        component: ProjectRelationFormComponent,
        breadcrumb: 'T_PROJECT_RELATION_CREATE',
      }, {
        path: ':id',
        component: ProjectRelationDetailsComponent,
        breadcrumb: 'T_PROJECT_RELATION_DETAILS',
      }, {
        path: ':id/edit',
        component: ProjectRelationFormComponent,
        breadcrumb: 'T_PROJECT_RELATION_EDIT',
      }]
    }])
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
