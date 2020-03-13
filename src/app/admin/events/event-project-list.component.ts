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

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { AdminEventService } from '../../core/services/admin-event.service';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-assessment-event-project-list',
  templateUrl: 'event-project-list.component.html'
})
export class AdminEventProjectListComponent extends ListComponentDirective<ProjectModel> implements OnChanges, OnInit {
  private _event: EventModel;

  public get event(): EventModel {
    return this._event;
  }

  @Input()
  public set event(value: EventModel) {
    this._event = value;
  }

  public get isEventFreezed(): boolean {
    return [EventStatus.Completed, EventStatus.InProgress].includes(this._event.status);
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: AdminProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: AdminEventService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'event-projects';
  }

  public ngOnInit() {
    if (!!this._event.id) {
      this._queryParams.eventId = this._event.id.toString();
    }
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['eventId']) {
      Object.assign(this._queryParams, { eventId: this._event.id.toString() });
      this._update();
    }
  }

  public delete(projectId?: ModelId) {
    if (this.isEventFreezed) {
      return;
    }

    this._eventService.removeProject(this._event.id, projectId).subscribe(() => this._update());
  }

  public projectsAdded() {
    this._update();
  }
}
