import { OnInit } from '@angular/core';
import { Model, ModelId } from '../../core/models/model';
import { IListResponse, IQueryParams, RestService } from '../../core/services/rest.service';
import { Filter } from '../../core/models/filter';
import { ActivatedRoute, Params } from '@angular/router';

export abstract class ListComponent<T extends Model> implements OnInit {
  protected _list: T[];
  protected _filters: Filter[] = [];
  protected _total: number;
  protected _queryParams: IQueryParams = {};

  private _size: number = 10;
  private _number: number = 1;

  protected _pageParams: IQueryParams = {
    'size': this._size.toString(),
    'number': this._number.toString()
  };

  public get number(): number {
    return this._number;
  }

  public get size(): number {
    return this._size;
  }

  public get list(): T[] {
    return this._list;
  }

  public get filters(): Filter[] {
    return this._filters;
  }

  public get total(): number {
    return this._total;
  }

  public get isLoaded() {
    return !!this._list;
  }

  constructor(protected _service: RestService<T>,
              protected _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this._activatedRoute.queryParams.forEach((params: Params) => {
      if (params['size']) {
        this._size = params['size'];
      }
      if (params['number']) {
        this._number = params['number'];
      }
    });
    this._pageParams = {
      'size': this._size.toString(),
      'number': this._number.toString()
    };
    this._update(this._pageParams);
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => this._update());
  }

  protected _update(queryParams?: IQueryParams) {
    this._service.list(queryParams).subscribe((res: IListResponse<T>) => {
      this._list = res.data;
      this._total = res.meta.total;
    });
  }

  public filterChange(value: IQueryParams) {
    this._update(value);
  }

  public pageChanged(value: IQueryParams) {
    this._update(value);
  }
}
