import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { EventModel } from '../../core/models/event-model';

@Component({
    moduleId: module.id,
    selector: 'bs-assessment-event-list',
    templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponent<EventModel> {

}
