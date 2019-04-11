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

    return this._http.post(requestParams, { groupId, userId }, requestOptions).pipe(
      catchError((error: any) => this._handleErrors(error)));
  }

  public addUsers(data: IDataRequestUserGroups[]): Observable<Object> {
    const requestParams = `${this._getRequestParams()}-users/add`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, data, requestOptions).pipe(
      catchError((error: any) => this._handleErrors(error)));
  }

  public removeUser(groupId?: ModelId, userId?: ModelId): Observable<Object> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions).pipe(
      catchError((error: any) => this._handleErrors(error)));
  }

  public removeUserFromAllGroup(data: IDataRequestUserGroups[]): Observable<Object> {
    const requestParams = `${this._getRequestParams()}-users/remove`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, data, requestOptions).pipe(
      catchError((error: any) => this._handleErrors(error)));
  }
}
