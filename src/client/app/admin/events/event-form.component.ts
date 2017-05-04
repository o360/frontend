import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form.component';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-form',
  templateUrl: 'event-form.component.html'
})
export class EventFormComponent extends FormComponent<EventModel> {
  protected _returnPath = ['/admin/events'];

  protected _startDate: Date;
  protected _endDate: Date;

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public set startDate(value: Date) {
    this._startDate = value;
  }

  public set endDate(value: Date) {
    this._endDate = value;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }
}
