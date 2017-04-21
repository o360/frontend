import { OnInit } from '@angular/core';
import { Model, ModelId } from '../../core/models/model';
import { IQueryParams, RestService } from '../../core/services/rest.service';
import { Filter } from '../../core/models/filter';

export abstract class ListComponent<T extends Model> implements OnInit {
  protected _list: T[];
  protected _filters: Filter[] = [];
  protected _queryParams: IQueryParams = {};

  public get list(): T[] {
    return this._list;
  }

  public get filters(): Filter[] {
    return this._filters;
  }

  public get isLoaded() {
    return !!this._list;
  }

  constructor(protected _service: RestService<T>) {
  }

  public ngOnInit() {
    this._update();
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => this._update());
  }

  protected _update(queryParams?: IQueryParams) {
    this._service.list(queryParams).subscribe((list: T[]) => {
      this._list = list;
    });
  }
}
