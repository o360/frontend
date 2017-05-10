import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { FormComponent } from '../../shared/components/form.component';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-form',
  templateUrl: 'event-form.component.html'
})
export class EventFormComponent extends FormComponent<EventModel> {
  protected _returnPath = ['/admin/events'];

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }
}
