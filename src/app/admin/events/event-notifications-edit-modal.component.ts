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

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  EventModel,
  EventNotificationKind,
  EventRecipient,
  EventStatus,
  IEventNotification
} from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';
import * as moment from 'moment';
import { ValidatorFutureDate } from '../../shared/components/datetime/datetime-picker.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from '../../shared/components/modal/modal.directive';

@Component({
  selector: 'bs-assessment-event-notifications-edit-modal',
  templateUrl: 'event-notifications-edit-modal.component.html'
})
export class AdminEventNotificationsEditModalComponent {
  protected _kinds: string[] = Object.values(EventNotificationKind);
  protected _recipients: string[] = Object.values(EventRecipient);
  protected _model: EventModel;
  protected _modal: ModalDirective;
  protected _index: number = -1;
  protected _notificationForm: FormGroup;
  protected _onNotificationAdded: EventEmitter<IEventNotification> = new EventEmitter<IEventNotification>();

  public get notificationForm(): FormGroup {
    return this._notificationForm;
  }

  public get model(): EventModel {
    return this._model;
  }

  @Input()
  public set model(value: EventModel) {
    this._model = value;
  }

  public get index(): number {
    return this._index;
  }

  @ViewChild('modal', { static: true })
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  @Output()
  public get onNotificationAdded(): EventEmitter<IEventNotification> {
    return this._onNotificationAdded;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get recipients(): string[] {
    return this._recipients;
  }

  public get isEditMode(): boolean {
    return this._index !== -1;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(protected _eventService: AdminEventService,
              protected _formBuilder: FormBuilder) {
    this._createForm();
  }

  public addNotification() {
    if (this._model.status === EventStatus.Completed) {
      return;
    }

    let notification: IEventNotification = this._notificationForm.value;

    if (!notification.kind || !notification.recipient) {
      let prevNotification = this._model.notifications[this._index];
      notification.kind = prevNotification.kind;
      notification.recipient = prevNotification.recipient;
    }

    if (this._index !== -1) {
      this._model.notifications.splice(this._index, 1);
    }

    this._onNotificationAdded.emit(notification);
    this.close();
  }

  public show(item?: IEventNotification) {
    this._notificationForm.reset(item || this._getDefaultFormValues());

    this._index = this._model.notifications.findIndex(
      ({ kind, recipient, time }: IEventNotification) => kind === item?.kind
        && recipient === item?.recipient
        && time === item?.time
    );

    if (this._index !== -1) {
      this._notificationForm.controls['recipient'].disable();
      this._notificationForm.controls['kind'].disable();
    } else {
      this._notificationForm.controls['recipient'].enable();
      this._notificationForm.controls['kind'].enable();
    }

    this._modal.show();
  }

  public close() {
    this._notificationForm.reset();
    this._modal.hide();
  }

  protected _createForm() {
    this._notificationForm = this._formBuilder.group({
      time: ['', [Validators.required, ValidatorFutureDate]],
      recipient: ['', Validators.required],
      kind: ['', Validators.required]
    });

    this._notificationForm.setValue(this._getDefaultFormValues());
  }

  private _getDefaultFormValues(): object {
    return {
      time: moment().add(1, 'hour'),
      recipient: '',
      kind: '',
    };
  }
}
