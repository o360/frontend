import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-details',
  templateUrl: 'event-details.component.html'
})
export class EventDetailsComponent extends DetailsComponent<EventModel> {
  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService, route: ActivatedRoute) {
    super(service, route);
  }
}
