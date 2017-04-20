import { OnInit } from '@angular/core';
import { Model, ModelId } from '../../core/models/model';
import { IQueryParams, RestService } from '../../core/services/rest.service';
import { Filter } from '../../core/models/filter';

export abstract class ListComponent<T extends Model> implements OnInit {
  protected _list: T[];
  protected _filters: Filter[] = [];
  protected _isEmpty: boolean = false;

  public get list(): T[] {
    return this._list;
  }

  public get filters(): Filter[] {
    return this._filters;
  }

  public get isEmpty(): boolean {
    return this._isEmpty;
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
      if (!this._list.length) {
        this._isEmpty = true;
      } else {
        this._isEmpty = false;
      }
    });
  }
}
