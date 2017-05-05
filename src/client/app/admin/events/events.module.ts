import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list.component';
import { EventDetailsComponent } from './event-details.component';
import { EventFormComponent } from './event-form.component';
import { EventProjectListComponent } from './event-project-list.component';
import { EventNotificationComponent } from './event-notification.component';
import { ProjectsAddModalComponent } from './projects-add-modal.component';
import { EventNotificationsEditModalComponent } from './event-notifications-edit-modal.component';


@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule
  ],
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventFormComponent,
    EventProjectListComponent,
    EventNotificationComponent,
    ProjectsAddModalComponent,
    EventNotificationsEditModalComponent
  ],
  exports: [
    EventListComponent,
    EventDetailsComponent,
    EventFormComponent,
    EventProjectListComponent,
    EventNotificationComponent,
    ProjectsAddModalComponent,
    EventNotificationsEditModalComponent
  ],
})
export class EventsModule {
}
