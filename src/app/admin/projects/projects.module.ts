import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { AdminProjectListComponent } from './project-list.component';
import { AdminProjectsRoutingModule } from './projects-routing.module';
import { AdminProjectDetailsComponent } from './project-details.component';
import { AdminProjectFormComponent } from './project-form.component';
import { AdminProjectRelationFormComponent } from './project-relation-form.component';
import { AdminProjectRelationListComponent } from './project-relation-list.component';
import { AdminProjectRelationDetailsComponent } from './project-relation-details.component';
import { AdminEmailTemplateAddModalComponent } from './email-templates-add-modal.component';
import { AdminProjectEmailTemplatesListComponent } from './project-email-template-list.component';
import { AdminRelationEmailTemplatesListComponent } from './relation-email-template-list.component';
import { AdminProjectEventListComponent } from './project-event-list.component';

@NgModule({
  imports: [
    SharedModule,
    AdminProjectsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AdminProjectListComponent,
    AdminProjectFormComponent,
    AdminProjectDetailsComponent,
    AdminProjectRelationListComponent,
    AdminProjectRelationFormComponent,
    AdminProjectRelationDetailsComponent,
    AdminEmailTemplateAddModalComponent,
    AdminProjectEmailTemplatesListComponent,
    AdminRelationEmailTemplatesListComponent,
    AdminProjectEventListComponent
  ],
  exports: [
    AdminProjectListComponent,
    AdminProjectFormComponent,
    AdminProjectDetailsComponent,
    AdminProjectRelationListComponent,
    AdminProjectRelationFormComponent,
    AdminProjectRelationDetailsComponent,
    AdminEmailTemplateAddModalComponent,
    AdminProjectEmailTemplatesListComponent,
    AdminRelationEmailTemplatesListComponent,
    AdminProjectEventListComponent
  ],
})
export class AdminProjectsModule {
}
