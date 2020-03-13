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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse, IQueryParams } from '../../core/services/rest.service';
import { FormComponent } from '../../shared/components/form.component';

@Component({
  selector: 'bs-group-form',
  templateUrl: 'group-form.component.html'
})
export class AdminGroupFormComponent extends FormComponent<GroupModel> {
  protected _returnPath: any[] = ['/admin/groups'];

  private _groups: GroupModel[];
  private _parentId: ModelId = null;
  private _queryParams: IQueryParams = {};

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get parentId() {
    return this._parentId;
  }

  constructor(service: AdminGroupService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public save() {
    if (this._model.parentId === '') {
      delete this._model.parentId;
    }
    this._returnPath = ['/admin/groups/'];
    super.save();
  }

  protected _load() {
    this._queryParams = Object.assign({}, { levels: '0' });
    this._service.list(this._queryParams).subscribe((res: IListResponse<GroupModel>) => {
      this._groups = res.data;
      super._load();
      if (this._parentId) {
        this._service.get(this._parentId).subscribe((value: GroupModel) => this._groups.push(value));
      }
    });

  }

  protected _processRouteParams(params: Params) {
    if (params['parentId']) {
      this._parentId = +params['parentId'];
      this._returnPath = ['/admin/groups/', this._parentId];
    }

    super._processRouteParams(params);
  }

  protected _processModel(model: GroupModel) {
    if (this._parentId) {
      model.parentId = this._parentId;
    }

    super._processModel(model);
  }

  protected _setModelName(model: GroupModel) {
    this._modelName = model.name;
  }

  protected async _fillBreadcrumbs(model: GroupModel) {
    let breadcrumbs: IBreadcrumb[] = [];

    if (this.editMode) {
      breadcrumbs.push({ label: model.name, url: `/admin/groups/${model.id}` });
    }

    let item = model;

    while (item.parentId) {
      item = await this._service.get(item.parentId).toPromise();
      breadcrumbs.push({ label: item.name, url: `/admin/groups/${item.id}` });
    }

    breadcrumbs.reverse();

    this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
  }
}
