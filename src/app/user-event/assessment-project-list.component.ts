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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListComponentDirective } from '../shared/components/list-component.directive';
import { ProjectModel } from '../core/models/project-model';
import { ModelId } from '../core/models/model';
import { NotificationService } from '../core/services/notification.service';
import { ProjectService } from '../core/services/project.service';
import { EventStatus } from '../core/models/event-model';
import { EventService } from '../core/services/event.service';
import { Utils } from '../utils';
import { IListResponse } from '../core/services/rest.service';

@Component({
  selector: 'bs-assessment',
  templateUrl: 'assessment-project-list.component.html'
})
export class AssessmentProjectListComponent extends ListComponentDirective<ProjectModel> implements OnInit {
  protected _eventId: ModelId;

  public get eventId(): ModelId {
    return this._eventId;
  }

  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: EventService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._eventId = params['id'];
      this._eventService.get(this._eventId).subscribe((event) => {
        if (event.status === EventStatus.NotStarted) {
          this._router.navigate(['events']);
        } else {
          this._queryParams.eventId = this._eventId.toString();
          this._update();
        }
      });
    });
  }

  public loadNextProject(assessments: any) {
    const nextProject = Utils.getNext(this._list, _ => _.active);

    if (nextProject) {
      this._list.forEach(_ => _.active = false);
      nextProject.active = true;
    }
  }

  protected _update() {
    Object.assign(this._queryParams, { onlyAvailable: 'true' });
    this._service.list(this._queryParams).subscribe((res: IListResponse<ProjectModel>) => {
      this._meta = res.meta;
      this._list = res.data
        .sort((x, y) => x.name < y.name ? -1 : 1)
        .sort(x => !x.formsOnSamePage ? -1 : 1);

      this._list.forEach(_ => _.active = false);
      this._list[0].active = true;

      this._list[this._list.length - 1].isLast = true;
    });
  }
}
