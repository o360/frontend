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
