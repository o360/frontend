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

import { forkJoin as observableForkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventStatus } from '../../core/models/event-model';
import { ModelId } from '../../core/models/model';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { AdminEventService } from '../../core/services/admin-event.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from '../../shared/components/modal/modal.directive';
import { Utils } from '../../utils';

interface ISelectProject {
  id: ModelId;
  name: string;
}

@Component({
  selector: 'bs-projects-add-modal',
  templateUrl: 'projects-add-modal.component.html'
})
export class AdminProjectsAddModalComponent implements OnChanges {
  public selectedProjects: ISelectProject[];

  private _eventId: ModelId;
  private _eventStatus: string;
  private _selectedProjectsIds: ModelId[] = [];
  private _modal: ModalDirective;
  private _projectsAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();
  private _selectItems: ISelectProject[] = [];

  @Input()
  public set eventId(value: ModelId) {
    this._eventId = value;
  }

  @Input()
  public set eventStatus(value: string) {
    this._eventStatus = value;
  }

  public get selectItems(): ISelectProject[] {
    return this._selectItems;
  }

  @Output()
  public get projectsAdded(): EventEmitter<ModelId[]> {
    return this._projectsAdded;
  }

  @ViewChild('modal', { static: true })
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public get isEventFreezed(): boolean {
    return [EventStatus.Completed, EventStatus.InProgress].includes(this._eventStatus);
  }

  constructor(protected _projectService: AdminProjectService,
              protected _eventService: AdminEventService,
              protected _notificationService: NotificationService,
              protected _translate: TranslateService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._load();
    }
  }

  public searchFn = (term: string, item: ISelectProject) => {
    return new RegExp(term, 'gi').test(item.name) ||
      new RegExp(term, 'gi').test(Utils.transliterate(item.name));
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    if (this._selectedProjectsIds.length > 0 && !this.isEventFreezed) {
      let transaction = this._selectedProjectsIds.map(projectId => this._eventService.addProject(this._eventId, projectId));

      observableForkJoin(transaction).subscribe(() => {
        this._modal.hide();
        this._projectsAdded.emit(this._selectedProjectsIds);
        this._notificationService.success('T_PROJECTS_ADDED_TO_EVENT');
      });
    }
  }

  public selectProject(value) {
    this._selectedProjectsIds = [];
    if (value) {
      value.forEach((item) => {
        this._selectedProjectsIds.push(item.id);
      });
    }
  }

  protected _load() {
    let eventQueryParams = { eventId: this._eventId.toString() };

    observableForkJoin([
      this._projectService.list(),
      this._projectService.list(eventQueryParams)
    ])
      .pipe(
        map(([allProjects, eventProjects]: IListResponse<ProjectModel>[]) => {
          return allProjects.data.filter(project => !eventProjects.data.find(x => x.id === project.id));
        })
      )
      .subscribe((availableProjects: ProjectModel[]) => {
        let availableForSelectionProjects: ISelectProject[] = [];
        availableProjects.map((project: ProjectModel) => {
          availableForSelectionProjects.push({ id: project.id, name: project.name });
        });
        this._selectItems = availableForSelectionProjects;
      });
    this._selectedProjectsIds = [];
    this.selectedProjects = [];
  }
}
