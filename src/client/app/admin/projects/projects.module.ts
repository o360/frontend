import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectsRoutingModule } from './projects-touting.module';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectFormComponent } from './project-form.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent
  ],
  exports: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent
  ],
})
export class ProjectsModule {
}
