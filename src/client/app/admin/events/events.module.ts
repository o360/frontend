import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list.component';
import { EventDetailsComponent } from './event-details.component';
import { EventFormComponent } from './event-form.component';


@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule
  ],
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventFormComponent
  ],
  exports: [
    EventListComponent,
    EventDetailsComponent,
    EventFormComponent
  ],
})
export class EventsModule {
}
