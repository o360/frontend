import { EnvConfig } from '../../../environments/env-config.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Config } from '../../../environments/env.config';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigurationService {
  private readonly _configUrlPath: string = '/config.json';
  private _configData: EnvConfig = Config;

  constructor(private _http: HttpClient) {
  }

  public loadConfigurationData(): Promise<EnvConfig> | Promise<void> {
    if (environment.production) {
      return this._http.get<EnvConfig>(`${this._configUrlPath}`, { responseType: 'json' })
        .pipe(
          tap((result: EnvConfig) => {
            alert(result);
            this._configData = result;
          }),
          catchError((error: HttpErrorResponse) => observableThrowError(error))
        )
        .toPromise();
    }
    return Promise.resolve();
  }

  public get config(): EnvConfig {
    return this._configData;
  }
}
