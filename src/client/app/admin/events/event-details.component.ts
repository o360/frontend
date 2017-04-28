import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { EventModel } from '../../core/models/event-model';

@Component({
    moduleId: module.id,
    selector: 'bs-assessment-event-details',
    templateUrl: 'event-details.component.html'
})
export class EventDetailsComponent extends DetailsComponent<EventModel> {

}
