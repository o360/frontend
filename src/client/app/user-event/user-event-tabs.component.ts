import { Component } from '@angular/core';
import { EventStatus } from '../core/models/event-model';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-user-event-tabs',
  templateUrl: 'user-event-tabs.component.html'
})
export class UserEventTabsComponent {
  public get EventStatus() {
    return EventStatus;
  }
}
