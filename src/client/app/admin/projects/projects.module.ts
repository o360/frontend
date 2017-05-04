import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectRelationFormComponent } from './project-relation-form.component';
import { ProjectRelationListComponent } from './project-relation-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProjectRelationDetailsComponent } from './project-relation-details.component';


@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ProjectRelationListComponent,
    ProjectRelationFormComponent,
    ProjectRelationDetailsComponent
  ],
  exports: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ProjectRelationListComponent,
    ProjectRelationFormComponent,
    ProjectRelationDetailsComponent
  ],
})
export class ProjectsModule {
}
