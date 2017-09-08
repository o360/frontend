import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { InviteModel } from '../models/invite-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'invites',
  entityConstructor: InviteModel
})
export class InviteService extends RestService<InviteModel> {
  public createRequest(model: InviteModel[]): Observable<InviteModel[]> {
    let requestParams = `${this._getRequestParams()}/create`;
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: any) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: any) => this._handleErrors(error));
  }
}
