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

import { IEnvConfig } from '../../../environments/env-config.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Config } from '../../../environments/env.config';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigurationService {
  private readonly _configUrlPath: string = '/assets/config.json';
  private _configData: IEnvConfig = Config;

  constructor(private _http: HttpClient) {
  }

  public loadConfigurationData(): Promise<IEnvConfig> | Promise<void> {
    if (environment.production) {
      return this._http.get<IEnvConfig>(`${this._configUrlPath}`, { responseType: 'json' })
        .pipe(
          tap((result: IEnvConfig) => this._configData = result),
          catchError((error: HttpErrorResponse) => observableThrowError(error))
        )
        .toPromise();
    }

    return Promise.resolve();
  }

  public get config(): IEnvConfig {
    return this._configData;
  }
}
