import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { EventModel } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'bs-assessment-event-list',
    templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponent<EventModel> {

  constructor(service: EventService, activatedRoute: ActivatedRoute, router: Router) {
    super(service, activatedRoute, router);
  }
}
