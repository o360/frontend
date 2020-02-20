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

import { Component, Input, OnInit } from '@angular/core';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';

@Component({
  selector: 'bs-project-event-list',
  templateUrl: 'project-event-list.component.html'
})
export class AdminProjectEventListComponent extends ListComponentDirective<EventModel> implements OnInit {
  protected _projectId: ModelId;

  @Input()
  public set projectId(value: ModelId) {
    this._projectId = value;
  }

  public get EventStatus() {
    return EventStatus;
  }
  constructor(service: AdminEventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'project-events';
  }

  public ngOnInit() {
    this._queryParams.projectId = this._projectId.toString();
    super.ngOnInit();
  }

  public remove(eventId?: ModelId) {
    (<AdminEventService> this._service).removeProject(eventId, this._projectId).subscribe(() => this._update());
  }
}
