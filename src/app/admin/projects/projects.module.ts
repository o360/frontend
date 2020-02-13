/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
