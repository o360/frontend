import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectRelationDetailsComponent } from './project-relation-details.component';
import { ProjectRelationFormComponent } from './project-relation-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: ProjectListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'create',
      component: ProjectFormComponent,
      data: { breadcrumb: 'T_ACTION_CREATE' },
    }, {
      path: ':id',
      component: ProjectDetailsComponent,
      data: { breadcrumb: 'T_PROJECT_DETAILS' },
    }, {
      path: ':id/edit',
      component: ProjectFormComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }, {
      path: ':projectId/relations',
      data: { breadcrumbIgnore: true },
      children: [{
        path: 'create',
        component: ProjectRelationFormComponent,
        data: { breadcrumb: 'T_PROJECT_RELATION_CREATE', breadcrumbIgnore: false },
      }, {
        path: ':id',
        component: ProjectRelationDetailsComponent,
        data: { breadcrumb: 'T_PROJECT_RELATION_DETAILS', breadcrumbIgnore: false },
      }, {
        path: ':id/edit',
        component: ProjectRelationFormComponent,
        data: { breadcrumb: 'T_PROJECT_RELATION_EDIT', breadcrumbIgnore: false },
      }]
    }])
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
