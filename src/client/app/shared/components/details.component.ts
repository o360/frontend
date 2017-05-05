import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';

export abstract class DetailsComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;

  public get model(): T {
    return this._model;
  }

  public set model(value: T) {
    this._model = value;
  }

  constructor(protected _service: RestService<T>,
              protected _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this._update();
    });
  }

  protected _update(): void {
    this._service.get(this._id).subscribe((model: T) => {
      this._model = model;
    });
  }
}
