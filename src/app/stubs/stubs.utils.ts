import { Injectable } from '@angular/core';
import { IQueryParams, ModelConstructor } from '../core/services/rest.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Model, ModelId } from '../core/models/model';
import { TestModel } from '../core/models/model.spec';

/* RestServiceStub stub */
@Injectable()
export class RestServiceStub<T extends Model> {
  public _entityConstructor: ModelConstructor<T>;

  public createEntity(json?: Object): T {
    return new this._entityConstructor(json);
  }

  public list(queryParams?: IQueryParams): Observable<any> {
    return of({ data: [new TestModel()] });
  }

  public get(id: ModelId, queryParams?: IQueryParams): Observable<any> {
    return of(new TestModel());
  }

  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    } else {
      return this._create(model);
    }
  }

  public delete(id: ModelId): Observable<void | Object> {
    return of({});
  }

  protected _update(model: T): Observable<T> {
    return of(model);
  }

  protected _create(model: T): Observable<T> {
    return of(model);
  }
}

/* Notification service stub */
export class NotificationServiceStub {
  public success() {
    return;
  }

  public error() {
    return;
  }

  public warning() {
    return;
  }

  public info() {
    return;
  }

  public clearAll() {
    return;
  }
}

/* Auth service stub */
export class AuthServiceStub {
  public get isLoggedIn() {
    return true;
  }

  public get token() {
    return 'test-token';
  }
}

/* Router stub */
export class RouterStub {
  public navigate() {
    return Promise.resolve(true);
  }
}

/* Confirmation stub */
export class ConfirmationStub {
  public loadComponent() {
    return;
  }

  public setViewContainerRef() {
    return;
  }
}

/* ActivatedRouteStub stub */
@Injectable()
export class ActivatedRouteStub {
  protected _testParams: IQueryParams = { number: '2' };
  protected _subject = new BehaviorSubject(this.testParams);
  public params = this._subject.asObservable();

  get testParams() {
    return this._testParams;
  }

  set testParams(params: IQueryParams) {
    this._testParams = params;
    this._subject.next(params);
  }
}
/* BreadcrumbService Stub */
export class BreadcrumbServiceStub {
  private _override: any;

  get override() {
    return this._override;
  }

  public overrideBreadcrumb() {
    return;
  }
}

/* TranslateServiceStub stub */
@Injectable()
export class TranslateServiceStub {
  setDefaultLang() {
    return;
  }

  public instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return 'translate';
  }
}

/* ToastServiceStub stub */
export class ToastsManagerStub {
  // public show(toast: Toast): Promise<Toast> {
  //   return new Promise((resolve) => {
  //     resolve(this.setupToast(toast));
  //   });
  // }

  public clearAllToasts() {
    return;
  }

  // public setupToast(toast: Toast): Toast {
  //   toast.id = 1;
  //   return toast;
  // }
  //
  // public error(message: string, title?: string, options?: any): Promise<Toast> {
  //   const data = options && options.data ? options.data : null;
  //   const toast = new Toast('error', message, title, data);
  //   return this.show(toast);
  // }
  //
  // public info(message: string, title?: string, options?: any): Promise<Toast> {
  //   const data = options && options.data ? options.data : null;
  //   const toast = new Toast('info', message, title, data);
  //   return this.show(toast);
  // }
  //
  // public success(message: string, title?: string, options?: any): Promise<Toast> {
  //   const data = options && options.data ? options.data : null;
  //   const toast = new Toast('success', message, title, data);
  //   return this.show(toast);
  // }
  //
  // public warning(message: string, title?: string, options?: any): Promise<Toast> {
  //   const data = options && options.data ? options.data : null;
  //   const toast = new Toast('warning', message, title, data);
  //   return this.show(toast);
  // }
  //
  // // allow user define custom background color and image
  // public custom(message: string, title?: string, options?: any): Promise<Toast> {
  //   const data = options && options.data ? options.data : null;
  //   const toast = new Toast('custom', message, title, data);
  //   return this.show(toast);
  // }
}
