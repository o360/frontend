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
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { RelationModel } from '../../core/models/relation-model';
import { AdminRelationService } from '../../core/services/admin-relation.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-project-relation-list',
  templateUrl: 'project-relation-list.component.html'
})
export class AdminProjectRelationListComponent extends ListComponentDirective<RelationModel> implements OnInit, OnChanges {
  protected _projectId: string = 'null';

  private _hasInProgressEvents: boolean;

  @Input()
  public set projectId(value: string) {
    this._projectId = value;
  }

  @Input()
  public set hasInProgressEvents(value: boolean) {
    this._hasInProgressEvents = value;
  }

  public get projectId() {
    return this._projectId;
  }

  public get hasInProgressEvents(): boolean {
    return this._hasInProgressEvents;
  }

  constructor(service: AdminRelationService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'project-relations';
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, { projectId: this._projectId });
      this._update();
    }
  }
}
