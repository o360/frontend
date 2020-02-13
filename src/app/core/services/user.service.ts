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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { IListResponse, RestService } from './rest.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group-model';
import { ConfigurationService } from './configuration.service';

@Injectable()
@RestServiceConfig({
  entityName: 'users',
  entityConstructor: UserModel
})
export class UserService extends RestService<UserModel> {
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService,
              configService: ConfigurationService) {
    super(http, authService, router, notificationService, confirmationService, configService);
  }

  public getGroups(id: ModelId): Observable<IListResponse<GroupModel>> {
    let requestParams = `${this._getRequestParams(id)}/groups`;
    let requestOptions = this._getRequestOptions();

    return this._http.get(requestParams, requestOptions)
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }
}
