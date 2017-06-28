import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

export abstract class DetailsComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;

  public get model(): T {
    return this._model;
  }

  constructor(protected _service: RestService<T>,
              protected _route: ActivatedRoute,
              protected _breadcrumbService: BreadcrumbService) {
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
      this._fillBreadcrumbs(model);
    });
  }

  protected _fillBreadcrumbs(model: T) {
    if (model.hasOwnProperty('name')) {
      this._breadcrumbService.overrideBreadcrumb([{ label: (<any>model).name }]);
    }
  };
}
