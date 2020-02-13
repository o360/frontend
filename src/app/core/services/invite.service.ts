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

import { catchError, map } from 'rxjs/operators';
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
  public createRequest(model: IDataRequestInvite[]): Observable<InviteModel> {
    let requestParams = this._getRequestParams();
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: any) => this._handleErrors(error))
      );
  }

  public asseptInvite(model: any): Observable<any> {
    let requestParams: string = this._getRequestParams();
    requestParams = requestParams.replace('admin/invites', 'invites/submit');
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: any) => this._handleErrors(error))
      );
  }
}
