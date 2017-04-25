import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectDetailsComponent } from './project-details.component';

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
      data: { breadcrumbIgnore: true },
    }, {
      path: ':id/edit',
      component: ProjectFormComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
