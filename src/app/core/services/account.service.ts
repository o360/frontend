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
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { IListResponse, RestService } from './rest.service';
import { GroupModel } from '../models/group-model';
import { Injectable } from '@angular/core';

@Injectable()
@RestServiceConfig({
  endpoint: 'users',
  entityName: 'current',
  entityConstructor: AccountModel
})
export class AccountService extends RestService<AccountModel> {
  public get(token: string): Observable<AccountModel> {
    let params = this._getRequestParams();
    let options = this._getRequestOptions();

    return this._http.get(params, options)
      .pipe(
        map((json: Object) => this.createEntity(json)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public setPicture(file: string): Observable<AccountModel> {
    let requestParams = `${this._getRequestParams()}/picture`;
    let requestOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': this._authService.token,
      })
    };

    let formData = new FormData();
    formData.append('picture', this._convertDataUriToBlob(file), 'pic.jpg');

    return this._http.post(requestParams, formData, requestOptions)
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public getGroups(): Observable<IListResponse<GroupModel>> {
    let requestParams = `${this._getRequestParams()}/groups`;
    let requestOptions = this._getRequestOptions();

    return this._http.get(requestParams, requestOptions)
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public list() {
    return observableThrowError('Method not allowed!');
  }

  public delete() {
    return observableThrowError('Method not allowed!');
  }

  protected _update(model: AccountModel): Observable<AccountModel> {
    let requestParams = this._getRequestParams();
    let json = JSON.stringify(model.toJson());
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }
}
