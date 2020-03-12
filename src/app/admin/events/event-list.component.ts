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
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { EventModel, EventSortField, EventStatus } from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, FilterType } from '../../core/models/filter';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-assessment-event-list',
  templateUrl: 'event-list.component.html'
})
export class AdminEventListComponent extends ListComponentDirective<EventModel> {
  protected _filters: Filter[] = [{
    name: 'T_EVENT_STATUS',
    field: 'status',
    type: FilterType.SELECT,
    values: Object.values(EventStatus).map(x => ({ name: `T_EVENT_STATUS_${x.toUpperCase()}`, value: x }))
  }, {
    name: 'T_EVENT_SORT',
    field: 'sort',
    type: FilterType.SELECT,
    values: Object.values(EventSortField).map(x => ({ name: `T_EVENT_${x.toUpperCase()}`, value: x }))
  }];

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: AdminEventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }
}
