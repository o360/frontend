import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorIsAfter, ValidatorIsBefore } from '../../shared/components/datetime/datetime-picker.component';

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
    this._model = this._prepareSaveForm();

    super.save();
  }

  protected _processModel(model: EventModel) {
    super._processModel(model);

    this._eventForm.reset(this._model);
  }

  protected _createForm() {
    this._eventForm = this._formBuilder.group({
      description: ['', Validators.required],
      start: ['', [Validators.required, ValidatorIsBefore('end')]],
      end: ['', [Validators.required, ValidatorIsAfter('start')]],
      canRevote: false
    });
  }

  protected _prepareSaveForm(): EventModel {
    let formModel = this._eventForm.value;

    let saveForm: EventModel = new EventModel({
      description: formModel.description,
      start: formModel.start,
      end: formModel.end,
      canRevote: formModel.canRevote
    });

    if (this._model.id) {
      saveForm.id = this._model.id;
    }

    return saveForm;
  }
}
