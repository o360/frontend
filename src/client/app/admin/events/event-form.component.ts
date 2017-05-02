import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form.component';
import { EventModel } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-form',
  templateUrl: 'event-form.component.html'
})
export class EventFormComponent extends FormComponent<EventModel> {


  constructor(service: EventService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }
}
