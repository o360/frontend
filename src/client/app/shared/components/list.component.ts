import { Input, OnInit } from '@angular/core';
import { Model, ModelId } from '../../core/models/model';
import { IListResponse, IQueryParams, IResponseMeta, RestService } from '../../core/services/rest.service';
import { Filter } from '../../core/models/filter';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { defaultPage, supportedSizes } from './pagination/pagination.component';

export abstract class ListComponent<T extends Model> implements OnInit {
  protected _list: T[];
  protected _filters: Filter[] = [];
  protected _meta: IResponseMeta;
  protected _queryParams: IQueryParams = {
    number: defaultPage.toString(),
    size: supportedSizes[0].toString()
  };
  protected _embedded: boolean = false;
  private _readonly: boolean = false;

  public get list(): T[] {
    return this._list;
  }

  public get filters(): Filter[] {
    return this._filters;
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
              protected _router: Router) {
  }

  public ngOnInit() {
    this._activatedRoute.queryParams.forEach(this._processRequestParams.bind(this));
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => this._update());
  }

  protected _processRequestParams(params: Params) {
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
    this._service.list(this._queryParams).subscribe((res: IListResponse<T>) => {
      this._meta = res.meta;
      this._list = res.data;
    });
  }

  public filterChange(value: IQueryParams) {
    let queryParams = Object.assign({}, value);

    queryParams.size = this._queryParams.size;
    queryParams.number = this._queryParams.number;

    this._queryParams = queryParams;

    this._update();
  }

  public pageQueryParamsChanged(value: IQueryParams) {
    Object.assign(this._queryParams, value);

    if (this._embedded) {
      this._update();
    } else {
      this._router.navigate([], {
        queryParams: { number: this._queryParams.number, size: this._queryParams.size },
        relativeTo: this._activatedRoute
      });
    }
  }
}
