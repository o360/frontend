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
import { SharedModule } from '../../shared/shared.module';
import { AdminEventsRoutingModule } from './events-routing.module';
import { AdminEventListComponent } from './event-list.component';
import { AdminEventDetailsComponent } from './event-details.component';
import { AdminEventFormComponent } from './event-form.component';
import { AdminEventProjectListComponent } from './event-project-list.component';
import { AdminEventNotificationComponent } from './event-notification-list.component';
import { AdminProjectsAddModalComponent } from './projects-add-modal.component';
import { AdminEventNotificationsEditModalComponent } from './event-notifications-edit-modal.component';
import { AdminEventCloneFormComponent } from './event-clone-form.component';

@NgModule({
  imports: [
    SharedModule,
    AdminEventsRoutingModule
  ],
  declarations: [
    AdminEventListComponent,
    AdminEventDetailsComponent,
    AdminEventFormComponent,
    AdminEventProjectListComponent,
    AdminEventNotificationComponent,
    AdminProjectsAddModalComponent,
    AdminEventNotificationsEditModalComponent,
    AdminEventCloneFormComponent
  ],
  exports: [
    AdminEventListComponent,
    AdminEventDetailsComponent,
    AdminEventFormComponent,
    AdminEventProjectListComponent,
    AdminEventNotificationComponent,
    AdminProjectsAddModalComponent,
    AdminEventNotificationsEditModalComponent,
    AdminEventCloneFormComponent
  ],
})
export class AdminEventsModule {
}
