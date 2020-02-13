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

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { GroupModel } from '../models/group-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs';

export interface IDataRequestUserGroups {
  groupId: ModelId;
  userId: ModelId;
}

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class AdminGroupService extends RestService<GroupModel> {
  public addUser(groupId?: ModelId, userId?: ModelId): Observable<Object> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, { groupId, userId }, requestOptions)
      .pipe(
        catchError((error: any) => this._handleErrors(error))
      );
  }

  public addUsers(data: IDataRequestUserGroups[]): Observable<Object> {
    const requestParams = `${this._getRequestParams()}-users/add`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, data, requestOptions)
      .pipe(
        catchError((error: any) => this._handleErrors(error))
      );
  }

  public removeUser(groupId?: ModelId, userId?: ModelId): Observable<Object> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .pipe(
        catchError((error: any) => this._handleErrors(error))
      );
  }

  public removeUserFromAllGroup(data: IDataRequestUserGroups[]): Observable<Object> {
    const requestParams = `${this._getRequestParams()}-users/remove`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, data, requestOptions)
      .pipe(
        catchError((error: any) => this._handleErrors(error))
      );
  }
}
