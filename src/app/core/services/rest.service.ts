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

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Model, ModelId } from '../models/model';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { ConfigurationService } from './configuration.service';

export interface IQueryParams {
  [key: string]: string | ModelId;
}

export interface IResponseMeta {
  number: number;
  size: number;
  total: number;
}

export interface IListResponse<T extends Model> {
  meta: IResponseMeta;
  data: T[];
}

export declare type ModelConstructor<T> = { new(json: Object): T };

/**
 * Base service class with CRUD methods
 * @example
 * For usage in a service add a RestServiceConfig decorator with properties
 * entityName: 'someName' and entityConstructor: NewModel
 * NewModel - it is a specific model that is extended by a Model
 * also service should extends this RestService<NewModel>
 *
 * @Defaults({
 *   name: ''
 * })
 * class UserModel extends Model {
 *   public name: string;
 * }
 *
 * @RestServiceConfig({
 *   entityName: 'user',
 *   entityConstructor: UserModel
 * })
 * class AdminUserService extends RestService<UserModel> {
 * }
 *
 * */
@Injectable()
export class RestService<T extends Model> {
  protected _host: string;
  protected _endpoint: string;
  protected _entityName: string;
  protected _entityConstructor: ModelConstructor<T>;

  constructor(protected _http: HttpClient,
              protected _authService: AuthService,
              protected _router: Router,
              protected _notificationService: NotificationService,
              @Inject(forwardRef(() => ConfirmationService)) protected _confirmationService: ConfirmationService,
              protected _configService: ConfigurationService) {
    this._host = this._configService.config.API;
  }

  /**
   * Create a new instance of related Model
   * @param json
   * @returns {T}
   */
  public createEntity(json?: Object): T {
    return new this._entityConstructor(json);
  }

  /**
   * Get list of data from API
   * @return {Observable<IListResponse<T>>}
   */
  public list(queryParams?: IQueryParams): Observable<IListResponse<T>> {
    return this._http.get(this._getRequestParams(undefined, queryParams), this._getRequestOptions())
      .pipe(
        map((json: any) => Object.assign(json, { data: json.data.map((x: any) => this.createEntity(x)) })),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  /**
   * Get a record of data by ID from API
   * @params {number} id of record
   * @return {Observable<T>}
   */
  public get(id: ModelId, queryParams?: IQueryParams): Observable<T> {
    return this._http.get(this._getRequestParams(id, queryParams), this._getRequestOptions())
      .pipe(
        map((json: any) => this.createEntity(json)),
        catchError((error: any) => this._handleErrors(error))
      );
  }

  /**
   * Save record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    }

    return this._create(model);
  }

  /**
   * Delete record of data by ID
   * @params {number} id of record
   * @return {Observable<void | Object>}
   */
  public delete(id: ModelId): Observable<void | Object> {
    const requestParams = this._getRequestParams(id);
    const requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  /**
   * Update record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _update(model: T): Observable<T> {
    const requestParams = this._getRequestParams(model.id);
    const json = JSON.stringify(model.toJson());
    const requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  /**
   * Create a new one record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _create(model: T): Observable<T> {
    const requestParams = this._getRequestParams();
    const json = JSON.stringify(model.toJson());
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  /**
   * Get full path with request params
   * @params {number} id
   * @return {Observable<T>}
   */
  protected _getRequestParams(id?: ModelId, params?: IQueryParams) {
    let path: string[] = [];

    path.push(this._configService.config.API);
    path.push(this._endpoint);
    path.push(this._entityName);

    if (id !== undefined) {
      path.push(id.toString());
    }

    path = path.filter(part => part && part !== '');

    let paramsString = '';

    if (params) {
      const param = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`);
      paramsString = `?${param.join('&')}`;
    }

    return path.join('/') + paramsString;
  }

  /**
   * Common request params for requests
   * @return {object}
   */
  protected _getRequestOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    });

    if (this._authService.isLoggedIn) {
      headers = headers.append('X-Auth-Token', this._authService.token);
    }

    return { headers };
  }

  /**
   * Handler of errors for the CRUD methods
   */
  protected _handleErrors(error: HttpErrorResponse) {
    const err = error.error;
    if (error.status === 400 || error.status === 403 || error.status === 404) {
      this._notificationService.error(this._prepareErrorCodeTranslation(err.code));

      return observableThrowError(error);
    }

    if (error.status === 401) {
      this._router.navigate(['/login']);

      return observableThrowError(error);
    }

    if (error.status === 409) {
      let conflicts = [
        'CONFLICT-GROUP-GENERAL',
        'CONFLICT-USER-GENERAL',
        'CONFLICT-FORM-GENERAL',
        'CONFLICT-PROJECT-GENERAL',
        'CONFLICT-RELATION-GENERAL',
        'CONFLICT-TEMPLATE-GENERAL'
      ];
      if (conflicts.indexOf(err.code) !== -1) {
        this._confirmationService.loadComponent(null, err.conflicts);
      } else {
        this._notificationService.error(this._prepareErrorCodeTranslation(err.code));
      }

      return observableThrowError(error);
    }

    this._notificationService.error(err.message, `${error.status} ${error.statusText}`);

    return observableThrowError(error);
  }

  protected _prepareErrorCodeTranslation(code: string) {
    return `T_ERROR_${code.replace(/-/g, '_')}`;
  }

  protected _convertDataUriToBlob(dataUri: string) {
    const byteString = atob(dataUri.split(',')[1]);
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];

    return new Blob([ia], { type: mimeString });
  }
}
