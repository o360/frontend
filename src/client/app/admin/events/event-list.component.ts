import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { EventModel, EventSortField, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, FilterType } from '../../core/models/filter';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-list',
  templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponent<EventModel> {
  protected _filters: Filter[] = [{
    name: 'T_EVENT_STATUS',
    field: 'status',
    type: FilterType.Select,
    values: Object.values(EventStatus).map(x => ({ name: 'T_EVENT_STATUS_' + x.toUpperCase(), value: x }))
  }, {
    name: 'T_EVENT_SORT',
    field: 'sort',
    type: FilterType.Select,
    values: Object.values(EventSortField).map(x => ({ name: 'T_EVENT_' + x.toUpperCase(), value: x }))
  }];

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService, activatedRoute: ActivatedRoute, router: Router) {
    super(service, activatedRoute, router);
  }
}
