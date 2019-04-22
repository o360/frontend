import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from '../../../environments/env.config';
import { Model, ModelId } from '../models/model';
import { AuthService } from './auth.service';
import { IListResponse, RestService } from './rest.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';

@Injectable()
export class FirebaseRestService<T extends Model> extends RestService<T> {
  protected _host: string = Config.FIREBASE_URL;

  /* @todo: Research: nested constructors works in angular 2.4.* */
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }

  public list(): Observable<IListResponse<T>> {
    return this._http.get(this._getRequestParams(), this._getRequestOptions())
      .pipe(
        map((response: any) => {
          let values: T[] = [];
          for (let [key, value] of Object.entries(response)) {
            let item = this.createEntity(value);
            item.id = key;
            values.push(item);
          }
          return { data: values, meta: { number: 1, size: values.length, total: values.length } };
        }),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public get(id: ModelId): Observable<T> {
    return this._http.get(this._getRequestParams(id), this._getRequestOptions())
      .pipe(
        map((json: any) => this.createEntity(Object.assign(json, { id }))),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  protected _getRequestParams(id?: ModelId) {
    return `${super._getRequestParams(id)}.json`;
  }
}
