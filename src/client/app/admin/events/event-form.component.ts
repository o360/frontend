import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';

export const EventFormValidator = (control: AbstractControl): ValidationErrors => {
  const start = control.get('start').value;
  const end = control.get('end').value;

  if (moment(start).isValid() && moment(end).isValid()) {
    return (moment(start).isSameOrBefore(end)) ? null : {minDate: 'T_ERROR_MIN_DATE'};
  } else {
    return null;
  }
}

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-form',
  templateUrl: 'event-form.component.html'
})
export class EventFormComponent extends FormComponent<EventModel> {
  protected _returnPath = ['/admin/events'];
  protected _eventForm: FormGroup;


  public get eventForm(): FormGroup {
    return this._eventForm;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              protected _formBuilder: FormBuilder) {
    super(service, router, route, notificationService);

    this._createForm();
  }

  public save() {
    this._model = new EventModel(this._eventForm.value);

    super.save();
  }

  protected _processModel(model: EventModel) {
    super._processModel(model);

    this._eventForm.reset(this._model);
  }

  protected _createForm() {
    this._eventForm = this._formBuilder.group({
        description: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required],
        canRevote: false
      },
      {validator: EventFormValidator});
  }
}
