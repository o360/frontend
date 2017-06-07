import { Component, Input } from '@angular/core';
import { EventModel, IEventNotification } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-notification',
  templateUrl: 'event-notification-list.component.html'
})
export class EventNotificationComponent {
  protected _event: EventModel;

  @Input()
  public set event(value: EventModel) {
    this._event = value;
  }

  public get event(): EventModel {
    return this._event;
  }

  constructor(protected _eventService: EventService,
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

  public notificationAdded(value: IEventNotification) {
    this._event.notifications.push(value);
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
}
