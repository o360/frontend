import { OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Model } from '../models/model';

export abstract class ListComponent<T extends Model> implements OnInit {
  protected _list: T[];

  public get list(): T[] {
    return this._list;
  }

  constructor(protected _service: RestService<T>) {
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    this._service.list()
      .subscribe((list: T[]) => {
        this._list = list;
      });
  }

  public remove(element: T) {
    let index = this._list.indexOf(element);
    this._list.splice(index, 1);

    this._service.delete(element.id)
      .subscribe(response => this._list);
    element = null;
  }
}
