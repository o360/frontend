import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Model, ModelId } from '../../core/models/model';
import { RestService } from '../../core/services/rest.service';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

export abstract class FormComponent<T extends Model> implements OnInit {
  protected _id: ModelId;
  protected _model: T;
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
    this._service.save(this._model).subscribe(model => {
      if (this._returnPath) {
        this._router.navigate([this._returnPath + '/' + model.id]);
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
    } else {
      return Observable.of(this._service.createEntity());
    }
  }

  protected _processModel(model: T) {
    this._model = model;
  }

  protected _fillBreadcrumbs(model: T) {
    if (model.hasOwnProperty('name')) {
      this._breadcrumbService.overrideBreadcrumb([{ label: (<any>model).name }]);
    }
  }
}

