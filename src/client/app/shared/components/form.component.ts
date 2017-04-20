import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';

export abstract class FormComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;
  protected _editMode: boolean = false;

  public get editMode(): boolean {
    return this._editMode;
  }

  public get model(): T {
    return this._model;
  }

  public set model(value: T) {
    this._model = value;
  }

  constructor(protected _service: RestService<T>,
              protected _router: Router,
              protected _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._route.params.forEach((params: Params) => {
      if (params['id']) {
        this._id = params['id'];
      }

      this._load();
    });
  }

  public save(returnPath: any[]) {
    this._service.save(this._model).subscribe(() => {
      if (returnPath) {
        this._router.navigate(returnPath);
      }
    });
  }

  protected _load() {
    if (this._id) {
      this._editMode = true;
      this._service.get(this._id).subscribe((model: T) => {
        this._model = model;
      });
    } else {
      this._model = this._service.createEntity();
    }
  }
}

