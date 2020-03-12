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
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { NotificationService } from '../../core/services/notification.service';
import { Filter, FilterType } from '../../core/models/filter';
import { IListResponse, IQueryParams } from '../../core/services/rest.service';

@Component({
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class AdminGroupListComponent extends ListComponentDirective<GroupModel> implements OnInit, OnChanges {
  protected _filters: Filter[] = [{
    name: 'T_GROUP_NAME',
    field: 'name',
    type: FilterType.STRING,
    values: Object.values(GroupModel.name).map(x => ({ value: x }))
  }];

  protected _parentId: string = 'null';
  protected _innerGroupState: boolean = false;
  protected _hasChildren: boolean = false;

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  @Output()
  public get innerGroupState(): boolean {
    return this._innerGroupState;
  }

  public get hasChildren(): boolean {
    return this._hasChildren;
  }

  constructor(service: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'group-list';
  }

  public ngOnInit() {
    this._queryParams.parentId = this._parentId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      if (this._list) {
        this._list = [];
      }
      Object.assign(this._queryParams, { parentId: this._parentId });
      this._update();
    }
  }

  public changeInnerGroupState() {
    return this._innerGroupState = !this._innerGroupState;
  }

  public _update() {
    this._fetching = this._service.list(this._queryParams).subscribe((res: IListResponse<GroupModel>) => {
      this._meta = res.meta;
      this._list = res.data;

      this._hasChildren = false;
      for (let i = 0; i < this._list.length; i++) {
        if (this._list[i].hasChildren) {
          this._hasChildren = true;
          break;
        }
      }
      if (this._queryParams.name) {
        this._searchForParents(this._list);
      }
    });
  }

  public filterChange(value: IQueryParams) {
    let queryParams = Object.assign({}, value);

    queryParams.size = this._queryParams.size;
    queryParams.number = this._queryParams.number;
    if (Object.keys(value).length === 0) {
      queryParams['parentId'] = this._parentId;
      this._innerGroupState = false;
    }
    queryParams.sort = value.sort ? value.sort : this._queryParams.sort;
    this._queryParams = queryParams;

    this._update();
  }

  protected _searchForParents(list: GroupModel[]) {
    if (list.length) {
      this._innerGroupState = true;
      observableForkJoin(list.filter(x => x.parentId)
        .map((group: GroupModel) => {
          return this._service.get(group.parentId);
        }))
        .subscribe((list: GroupModel[]) => {
          list.filter((group, i) => list.findIndex(listGroup => listGroup.id === group.id) === i)
            .filter(group => !this._list.find(listGroup => listGroup.id === group.id))
            .forEach((group: GroupModel) => {
              this._list = this._list.filter(listGroup => listGroup.parentId !== group.id);
              this._list.push(group);
            });
          this._searchForParents(list);
        });
    } else {
      this._innerGroupState = false;
    }
  }
}
