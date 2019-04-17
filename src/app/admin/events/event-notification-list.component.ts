import { Component, Input } from '@angular/core';
import { EventModel, EventStatus, IEventNotification } from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';
import { NotificationService } from '../../core/services/notification.service';
import { DateFormat } from '../../shared/components/datetime/datetime-picker.component';
import * as moment from 'moment';

@Component({
  selector: 'bs-assessment-event-notification',
  templateUrl: 'event-notification-list.component.html'
})
export class AdminEventNotificationComponent {
  protected _event: EventModel;

  @Input()
  public set event(value: EventModel) {
    this._event = value;
  }

  public get event(): EventModel {
    return this._event;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(protected _eventService: AdminEventService,
              protected _notificationService: NotificationService) {
  }

  public deleteNotification(notification: IEventNotification) {
    let index: number = this._event.notifications.indexOf(notification);
    if (index !== -1) {
      this._event.notifications.splice(index, 1);
    }
    this._eventService.save(this._event).subscribe(() => {
      this._update();
    });
  }

  public onNotificationAdded(value: IEventNotification) {
    let notification = {
      time: moment(value.time).format(DateFormat.Backend),
      recipient: value.recipient,
      kind: value.kind
    };
    this._event.notifications.push(notification);

    this._eventService.save(this._event).subscribe(
      () => {
        this._update();
        this._notificationService.success('T_NEW_EVENT_NOTIFICATION_ADDED');
      },
      error => this._update()
    );
  }

  protected _update() {
    this._eventService.get(this._event.id).subscribe((event: EventModel) => {
      this._event = event;
    });
  }

  public _formatData({time}: IEventNotification) {
     return moment(time);
  }
}
