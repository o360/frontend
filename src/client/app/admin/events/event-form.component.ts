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

  public get EventStatus() {
    return EventStatus;
  }

  private _startDate: Date;
  private _endDate: Date;

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

  constructor(service: EventService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  protected _processModel(model: EventModel) {
    if (model.start && model.end) {
      this._startDate = new Date(model.start);
      this._endDate = new Date(model.end);
    } else {
      this._startDate = new Date();
      this._endDate = new Date();
    }

    super._processModel(model);
  }

  public save() {
    let start = new Date(this._startDate);
    let end = new Date(this._endDate);
    this._model.start = start.toISOString().split('.')[0] + 'Z';
    this._model.end = end.toISOString().split('.')[0] + 'Z';

    super.save();
  }

}
