import { Injectable } from '@angular/core';
import { IQueryParams } from '../core/services/rest.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  private _override;
  get override() {
    return this._override;
  }
  public overrideBreadcrumb() {
    return;
  }
}
