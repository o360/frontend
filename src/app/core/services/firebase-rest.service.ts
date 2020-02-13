/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Model, ModelId } from '../models/model';
import { AuthService } from './auth.service';
import { IListResponse, RestService } from './rest.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class FirebaseRestService<T extends Model> extends RestService<T> {
  protected _host: string;

  /* @todo: Research: nested constructors works in angular 2.4.* */
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService,
              configService: ConfigurationService) {
    super(http, authService, router, notificationService, confirmationService, configService);
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
