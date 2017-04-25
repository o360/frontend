import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectRelationFormComponent } from './project-relation-form.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ProjectRelationFormComponent
  ],
  exports: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ProjectRelationFormComponent
  ],
})
export class ProjectsModule {
}
