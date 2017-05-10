import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EventModel, EventNotificationKind, EventRecipient, IEventNotification } from '../../core/models/event-model';
import { ModalDirective } from 'ngx-bootstrap';

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

  protected _notification: IEventNotification = {
    time: '',
    recipient: '',
    kind: ''
  };

  private _notificationAdded: EventEmitter<IEventNotification> = new EventEmitter<IEventNotification>();

  public get model(): EventModel {
    return this._model;
  }

  @Input()
  public set model(value: EventModel) {
    this._model = value;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  @Output()
  public get notificationAdded(): EventEmitter<IEventNotification> {
    return this._notificationAdded;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get recipients(): string[] {
    return this._recipients;
  }

  public addNotification(time: string, recipient: string, kind: string) {
    let timeDate = new Date(time);
    this._notification = {
      time: timeDate.toISOString().split('.')[0] + 'Z',
      recipient: recipient,
      kind: kind
    };
    this._notificationAdded.emit(this._notification);
    this._modal.hide();
  }

  public show() {
    this._modal.show();
  }
}
