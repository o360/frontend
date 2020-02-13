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
import { ListComponent } from '../shared/components/list.component';
import { EventModel, EventStatus } from '../core/models/event-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse } from '../core/services/rest.service';
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'bs-assessment-user-event-list',
  templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponent<EventModel> {
  protected _status: string = 'null';

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  public get status(): string {
    return this._status;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  protected _update() {
    const queryParams = { status: this._status, sort: 'start', onlyAvailable: 'true' };
    if (this._status === EventStatus.Completed) {
      queryParams.sort = 'end';
    }

    this._fetching = this._service.list(queryParams).subscribe((res: IListResponse<EventModel>) => {
      this._meta = res.meta;
      this._list = res.data;
    });
  }
}
