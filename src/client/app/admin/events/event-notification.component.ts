import { Component, Input } from '@angular/core';
import { EventModel, EventNotificationKind, EventRecipient, IEventNotification } from '../../core/models/event-model';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-notification',
  templateUrl: 'event-notification.component.html'
})
export class EventNotificationComponent {
  protected _kinds: string[] = Object.values(EventNotificationKind);
  protected _recipients: string[] = Object.values(EventRecipient);
  protected _readonly: boolean = false;

  @Input()
  public set readonly(value: boolean | string) {
    this._readonly = typeof value === 'boolean' ? value : true;
  }

  public get readonly(): boolean | string {
    return this._readonly;
  }

  protected _event: EventModel;
  protected _notification: IEventNotification = {
    time: '',
    recipient: '',
    kind: ''
  };

  private _time: Date;

  public set time(value: Date) {
    this._time = value;
  }

  public get time(): Date {
    return this._time;
  }

  @Input()
  public set event(value: EventModel) {
    this._event = value;
  }

  public get event(): EventModel {
    return this._event;
  }

  public get notification(): IEventNotification {
    return this._notification;
  }

  public set notification(value: IEventNotification) {
    this._notification = value;
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
    this._event.notifications.push(this._notification);
  }

  public deleteNotification(notification: IEventNotification) {
    let index: number = this._event.notifications.indexOf(notification);
    if (index !== -1) {
      this._event.notifications.splice(index, 1);
    }
  }
}
