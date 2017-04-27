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
    let requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    let json = {
      "groupId": groupId,
      "userId": userId
    };
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  public removeUser(groupId?: ModelId, userId?: ModelId): Observable<void> {
    let requestParams = `${this._getRequestParams(groupId)}/users/${userId}`;
    let requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: Response) => this._handleErrors(error));
  }
}
