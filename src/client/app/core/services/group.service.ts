import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { GroupModel } from '../models/group-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs/Observable';

@Injectable()
@RestServiceConfig({
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class GroupService extends RestService<GroupModel> {
  public addUser(groupId?: ModelId, userId?: ModelId): Observable<void> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, { groupId, userId }, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  public removeUser(groupId?: ModelId, userId?: ModelId): Observable<void> {
    const requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    const requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }
}
