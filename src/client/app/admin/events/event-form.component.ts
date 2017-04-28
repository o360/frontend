import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form.component';
import { EventModel } from "../../core/models/event-model";

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-form',
  templateUrl: 'event-form.component.html'
})
export class EventFormComponent extends FormComponent<EventModel> {
}
