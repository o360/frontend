
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { InviteModel } from '../models/invite-model';
import { Observable } from 'rxjs';
import { ModelId } from '../models/model';

export interface IDataRequestInvite {
  email: string;
  groups: ModelId[];
}

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'invites',
  entityConstructor: InviteModel
})
export class InviteService extends RestService<InviteModel> {
  public createRequest(model: IDataRequestInvite[]): Observable<InviteModel[]> {
    let requestParams = this._getRequestParams();
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions).pipe(
      map((res: any) => res.json()),
      map((json: any) => this.createEntity(json)),
      catchError((error: any) => this._handleErrors(error)),);
  }

  public asseptInvite(model: any): Observable<any> {
    let requestParams: string = this._getRequestParams();
    requestParams =  requestParams.replace('admin/invites', 'invites/submit');
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions).pipe(
      map((res: any) => res.json()),
      map((json: any) => this.createEntity(json)),
      catchError((error: any) => this._handleErrors(error)),);
  }
}
