/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { ValidatorFutureDate, ValidatorIsAfter, ValidatorIsBefore } from '../../shared/components/datetime/datetime-picker.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-assessment-event-clone-form',
  templateUrl: 'event-clone-form.component.html'
})
export class AdminEventCloneFormComponent extends FormComponent<EventModel> {
  protected _returnPath = ['/admin/events'];
  protected _eventForm: FormGroup;

  public get eventForm(): FormGroup {
    return this._eventForm;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: AdminEventService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _formBuilder: FormBuilder) {
    super(service, router, route, notificationService, breadcrumbService);

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
      description: ['', [Validators.required, Validators.pattern(/.*^[\S].*/)]],
      start: ['', [Validators.required, ValidatorIsBefore('end'), ValidatorFutureDate]],
      end: ['', [Validators.required, ValidatorIsAfter('start'), ValidatorFutureDate]]
    });
  }

  protected _prepareSaveForm(): EventModel {
    let formModel = this._eventForm.value;

    let saveForm: EventModel = new EventModel({
      description: formModel.description,
      start: formModel.start,
      end: formModel.end
    });

    if (this._model.id) {
      saveForm.id = this._model.id;
    }

    return saveForm;
  }
}
