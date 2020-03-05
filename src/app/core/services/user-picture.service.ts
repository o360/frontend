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

import { HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';
import { Injectable } from '@angular/core';

@Injectable()
@RestServiceConfig({
  entityName: 'users',
  entityConstructor: AccountModel
})
export class UserPictureService extends RestService<AccountModel> {
  public getPicture(id: ModelId): Observable<any> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = {
      // ResponseType: blob known angular issue
      // (https://github.com/angular/angular/issues/19888)
      // Current solution it's hacky but works.
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'X-Auth-Token': this._authService.token
      })
    };

    return this._http.get(requestParams, requestOptions)
      .pipe(
        map((response: any) => response),
        mergeMap((image: Blob) => this._createImageFromBlob(image))
      );
  }

  protected _createImageFromBlob(image: Blob) {
    let obs = new Observable((observer) => {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        observer.next(reader.result);
        observer.complete();
      }, false);

      reader.addEventListener('error', () => {
        observer.error();
      }, false);

      reader.readAsDataURL(image);
    });

    return obs;
  }
}
