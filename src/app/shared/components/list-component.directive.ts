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

import { Directive, Input, OnInit } from '@angular/core';
import { Model, ModelId } from '../../core/models/model';
import { IListResponse, IQueryParams, IResponseMeta, RestService } from '../../core/services/rest.service';
import { Filter } from '../../core/models/filter';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { defaultPage, supportedSizes } from './pagination/pagination.component';
import { NotificationService } from '../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Directive()
export abstract class ListComponentDirective<T extends Model> implements OnInit {
  protected _list: T[];
  protected _listName: string = 'table';
  protected _filters: Filter[] = [];
  protected _meta: IResponseMeta;
  protected _id: string = 'id';
  protected _fetching: Subscription;
  protected _queryParams: IQueryParams = {
    sort: this._id.toString(),
    number: defaultPage.toString(),
    size: supportedSizes[0].toString()
  };
  protected _embedded: boolean = false;
  protected _readonly: boolean = false;

  public get list(): T[] {
    return this._list;
  }

  public get listName(): string {
    return this._listName;
  }

  public get filters(): Filter[] {
    return this._filters;
  }

  @Input()
  public set filters(value: Filter[]) {
    this._filters = value;
  }

  public get meta(): IResponseMeta {
    return this._meta;
  }

  public get queryParams(): IQueryParams {
    return this._queryParams;
  }

  public get isLoaded() {
    return !!this._list;
  }

  @Input()
  public set embedded(value: boolean | string) {
    this._embedded = typeof value === 'boolean' ? value : true;
  }

  @Input()
  public set readonly(value: boolean | string) {
    this._readonly = typeof value === 'boolean' ? value : true;
  }

  public get readonly(): boolean | string {
    return this._readonly;
  }

  constructor(protected _service: RestService<T>,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this._activatedRoute.queryParams
      .subscribe((params: Params) => this._processRequestParams(params));
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => {
      this._update();
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  public filterChange(value: IQueryParams) {
    let queryParams = Object.assign({}, value);

    queryParams.size = this._queryParams.size;
    queryParams.number = this._queryParams.number;
    queryParams.sort = value.sort ? value.sort : this._queryParams.sort;

    this._queryParams = queryParams;

    this._update();
  }

  public pageQueryParamsChanged(value: IQueryParams) {
    Object.assign(this._queryParams, value);

    if (this._embedded) {
      this._update();

      if (value.number) {
        this._backToTop();
      }
    } else {
      this._router.navigate([], {
        queryParams: { number: this._queryParams.number, size: this._queryParams.size, sort: this._queryParams.sort },
        relativeTo: this._activatedRoute
      });
    }
  }

  protected _backToTop() {
    let top: number;

    if (this._listName === 'table') {
      top = $(this._listName).offset().top - $(this._listName).position().top;
    } else {
      top = $(`#${this._listName}`).offset().top - $(`#${this._listName}`).position().top;
    }

    $(window).scrollTop(top);
  }

  protected _processRequestParams(params: Params) {
    if (this._fetching) {
      this._fetching.unsubscribe();
    }

    if (!this._embedded) {
      if (params['size']) {
        this._queryParams.size = params['size'];
      }

      if (params['number']) {
        this._queryParams.number = params['number'];
      }
    }

    this._update();
  }

  protected _update() {
    this._fetching = this._service.list(this._queryParams).subscribe((res: IListResponse<T>) => {
      this._meta = res.meta;
      this._list = res.data;
    });
  }
}
