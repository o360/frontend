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
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event.routing.module';
import { EventListComponent } from './event-list.component';
import { EventTabsComponent } from './event-tabs.component';
import { AssessmentProjectListComponent } from './assessment-project-list.component';
import { AssessmentEventComponent } from './assessment-event.component';
import { AssessmentFormComponent } from './assessment-form.component';
import { AssessmentObjectListComponent } from './assessment-object-list.component';
import { AssessmentFormModalComponent } from './assessment-form-modal.component';

@NgModule({
  imports: [
    SharedModule,
    EventRoutingModule
  ],
  declarations: [
    EventListComponent,
    EventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    AssessmentFormComponent,
    AssessmentObjectListComponent,
    AssessmentObjectListComponent,
    AssessmentFormModalComponent
  ],
  exports: [
    EventListComponent,
    EventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    AssessmentObjectListComponent,
    AssessmentFormModalComponent,
    AssessmentFormComponent,
    AssessmentObjectListComponent
  ],
})
export class EventModule {
}
