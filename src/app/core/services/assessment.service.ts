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
import { IQueryParams, RestService } from './rest.service';
import { AssessmentModel } from '../models/assessment-model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
@RestServiceConfig({
  entityName: 'assessments',
  entityConstructor: AssessmentModel
})
export class AssessmentService extends RestService<AssessmentModel> {
  public saveBulk(model: AssessmentModel[], queryParams?: IQueryParams): Observable<AssessmentModel> {
    let requestParams = this._getRequestParams(undefined, queryParams);
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }
}
