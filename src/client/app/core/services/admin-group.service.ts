import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { GroupModel } from '../models/group-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs/Observable';
import { IDataRequestUserFromGroup } from '../../shared/confirmation/confirmation.component';

export interface IDataRequestUserFromGroup {
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
  public addUser(groupId?: ModelId, userId?: ModelId): Observable<void> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, { groupId, userId }, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  public addUsers(data: IDataRequestUserFromGroup[]): Observable<void> {
    const requestParams = `${this._getRequestParams()}-users/add`;
    const requestOptions = this._getRequestOptions();
    return this._http.post(requestParams, data, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  public removeUser(groupId?: ModelId, userId?: ModelId): Observable<void> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  public removeUserFromAllGroup(data: IDataRequestUserFromGroup[]): Observable<void> {
    const requestParams = `${this._getRequestParams()}-users/remove`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, data, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }
}
