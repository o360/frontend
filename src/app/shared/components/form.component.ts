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

import { Observable, of as observableOf } from 'rxjs';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

export abstract class FormComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;
  protected _modelName: string;
  protected _returnPath: any[];

  public get model(): T {
    return this._model;
  }

  public set model(value: T) {
    this._model = value;
  }

  public get isLoaded() {
    return !!this._model;
  }

  public get editMode(): boolean {
    return !!this._id;
  }

  public get modelName(): string {
    return this._modelName;
  }

  constructor(protected _service: RestService<T>,
              protected _router: Router,
              protected _route: ActivatedRoute,
              protected _notificationService: NotificationService,
              protected _breadcrumbService: BreadcrumbService) {
  }

  public ngOnInit(): void {
    this._route.params.forEach(this._processRouteParams.bind(this));
  }

  public save() {
    this._service.save(this._model).subscribe((model) => {
      if (this._returnPath) {
        this._router.navigate([`${this._returnPath}/${model.id}`]);
      }
      this._notificationService.success('T_SUCCESS_SAVED');
    });
  }

  protected _processRouteParams(params: Params) {
    if (params['id']) {
      this._id = params['id'];
    }

    this._load();
  }

  protected _load() {
    this._loadModel().subscribe(this._processModel.bind(this));
  }

  protected _loadModel() {
    if (this._id) {
      return this._service.get(this._id);
    }

    return observableOf(this._service.createEntity());
  }

  protected _processModel(model: T) {
    this._model = model;
    this._setModelName(model);
    this._fillBreadcrumbs(model);
  }

  protected _setModelName(model: T) {
    this._modelName = model?.id?.toString();
  }

  protected _fillBreadcrumbs(model: T) {
    if (model.hasOwnProperty('name') && (<any> model).name !== '') {
      this._breadcrumbService.overrideBreadcrumb([{ label: (<any> model).name }]);
    }
  }
}
