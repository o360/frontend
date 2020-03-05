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
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-child-group-list',
  templateUrl: 'child-group-list.component.html'
})
export class AdminChildGroupListComponent extends ListComponentDirective<GroupModel> implements OnInit, OnChanges {
  protected _parentId: string = 'null';

  private _innerGroupState: boolean = false;

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  @Input()
  public set innerGroupState(value: boolean) {
    this._innerGroupState = value;
  }

  public get innerGroupState(): boolean {
    return this._innerGroupState;
  }

  constructor(service: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.parentId = this._parentId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      Object.assign(this._queryParams, { parentId: this._parentId });
    }
  }
}
