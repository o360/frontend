import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EventModel, EventNotificationKind, EventRecipient, IEventNotification } from '../../core/models/event-model';
import { ModalDirective } from 'ngx-bootstrap';
import { EventService } from '../../core/services/event.service';
import * as moment from 'moment';
import { DateFormat } from '../../shared/components/datetime/datetime-picker.component';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-notifications-edit-modal',
  templateUrl: 'event-notifications-edit-modal.component.html'
})
export class EventNotificationsEditModalComponent {
  protected _kinds: string[] = Object.values(EventNotificationKind);
  protected _recipients: string[] = Object.values(EventRecipient);
  protected _model: EventModel;
  protected _modal: ModalDirective;
  protected _index: number = null;

  protected _notification: IEventNotification = {
    time: moment().format(DateFormat.Backend),
    recipient: '',
    kind: ''
  };

  private _onNotificationAdded: EventEmitter<IEventNotification> = new EventEmitter<IEventNotification>();

  public get model(): EventModel {
    return this._model;
  }

  @Input()
  public set model(value: EventModel) {
    this._model = value;
  }

  public get notification(): IEventNotification {
    return this._notification;
  }

  public set notification(value: IEventNotification) {
    this._notification = value;
  }

  public get index(): number {
    return this._index;
  }

  public set index(value: number) {
    this._index = value;
  }

  @ViewChild('modal')
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

  constructor(protected _eventService: EventService) {
  }

  public addNotification() {
    if (this._index !== -1) {
      this._model.notifications.splice(this._index, 1);
    }
    this._eventService.save(this._model).subscribe((event) => {
      this._model = event;
    });
    this._notification = {
      time: moment(this.notification.time).format(DateFormat.Backend),
      recipient: this._notification.recipient,
      kind: this._notification.kind
    };
    this._onNotificationAdded.emit(this._notification);
    this._modal.hide();
  }

  public show(item: IEventNotification) {
    this.clear();
    this._index = this._model.notifications.indexOf(item);
    if (item) {
      this._notification = Object.assign({}, item);
    }
    this._modal.show();
  }

  public clear() {
    this._notification = {
      time: moment().format(DateFormat.Backend),
      recipient: '',
      kind: ''
    };
  }
}
