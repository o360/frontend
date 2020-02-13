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

import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { NotificationService } from '../../core/services/notification.service';

export abstract class DetailsComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;
  protected _returnPath: string;

  public get model(): T {
    return this._model;
  }

  constructor(protected _service: RestService<T>,
              protected _route: ActivatedRoute,
              protected _router: Router,
              protected _breadcrumbService: BreadcrumbService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this._update();
    });
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => {
      this._router.navigate([this._returnPath]);
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  protected _update(): void {
    this._service.get(this._id).subscribe((model: T) => {
      this._model = model;
      this._fillBreadcrumbs(model);
    });
  }

  protected _fillBreadcrumbs(model: T) {
    if (model.hasOwnProperty('name')) {
      this._breadcrumbService.overrideBreadcrumb([{ label: (<any>model).name }]);
    }
  }
}
