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

import {
  Observable,
  of,
  throwError as observableThrowError
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum authProvider {
  'CREDENTIALS' = 'CREDENTIALS',
  'FACEBOOK' = 'FACEBOOK',
  'GOOGLE' = 'GOOGLE',
  'VK' = 'VK',
}

@Injectable()
@RestServiceConfig({
  entityName: 'auth',
  entityConstructor: AccountModel
})
export class OAuthService extends RestService<AccountModel> {
  public authenticate(provider: string, code: string): Observable<string> {
    let body = JSON.stringify({ 'code': code });
    let params = `${this._getRequestParams()}/${provider}`;
    let options = this._getRequestOptions();

    return this._http.post(params, body, options)
      .pipe(
        map((json: any) => <string> json['token']),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public list() {
    return observableThrowError('Method not allowed!');
  }

  public listAvailableProviders() {
    return this._http.get(`${this._configService.config.API}/auth-providers`)
      .pipe(
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public delete() {
    return observableThrowError('Method not allowed!');
  }
}
