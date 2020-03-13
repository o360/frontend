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
    if (this._event.status === EventStatus.Completed) {
      return;
    }

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

  public formatData({ time }: IEventNotification) {
    return moment(time);
  }

  protected _update() {
    this._eventService.get(this._event.id).subscribe((event: EventModel) => {
      this._event = event;
    });
  }
}
