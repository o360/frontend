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

import { Injectable } from '@angular/core';
import { IQueryParams, ModelConstructor } from '../core/services/rest.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Model, ModelId } from '../core/models/model';
import { TestModel } from '../core/models/model.spec';
import { AssessmentModel } from '../core/models/assessment-model';
import { IEnvConfig } from '../../environments/env-config.interface';
import { FormModel } from '../core/models/form-model';

/* RestServiceStub stub */
@Injectable()
export class RestServiceStub<T extends Model> {
  public _entityConstructor: ModelConstructor<T>;

  public createEntity(json?: Object): T {
    return new this._entityConstructor(json);
  }

  public list(queryParams?: IQueryParams): Observable<any> {
    return of({ data: [new TestModel()] });
  }

  public get(id: ModelId, queryParams?: IQueryParams): Observable<any> {
    return of(new TestModel());
  }

  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    }

    return this._create(model);
  }

  public delete(id: ModelId): Observable<void | Object> {
    return of({});
  }

  protected _update(model: T): Observable<T> {
    return of(model);
  }

  protected _create(model: T): Observable<T> {
    return of(model);
  }
}

/* Notification service stub */
export class NotificationServiceStub {
  public success() {
    return;
  }

  public error() {
    return;
  }

  public warning() {
    return;
  }

  public info() {
    return;
  }

  public clearAll() {
    return;
  }
}

/* Auth service stub */
export class AuthServiceStub {
  public get isLoggedIn() {
    return true;
  }

  public get token() {
    return 'test-token';
  }
}

/* Router stub */
export class RouterStub {
  public navigate() {
    return Promise.resolve(true);
  }
}

/* Confirmation stub */
export class ConfirmationStub {
  public loadComponent() {
    return;
  }

  public setViewContainerRef() {
    return;
  }
}

/* ActivatedRouteStub stub */
@Injectable()
export class ActivatedRouteStub {
  protected _testParams: IQueryParams = { number: '2' };
  protected _subject = new BehaviorSubject(this.testParams);

  // tslint:disable-next-line:member-ordering
  public params = this._subject.asObservable();

  get testParams() {
    return this._testParams;
  }

  set testParams(params: IQueryParams) {
    this._testParams = params;
    this._subject.next(params);
  }
}
/* BreadcrumbService Stub */
export class BreadcrumbServiceStub {
  private _override: any;

  get override() {
    return this._override;
  }

  public overrideBreadcrumb() {
    return;
  }
}

/* TranslateServiceStub stub */
@Injectable()
export class TranslateServiceStub {
  public setDefaultLang() {
    return;
  }

  public instant(key: string | string[], interpolateParams?: Object): string | any {
    return 'translate';
  }
}

/* AssessmentServiceStub stub */
@Injectable()
export class AssessmentServiceStub {
  private mockData: any = {
    forms: [
      {
        answers: [
          { elementId: 5895, text: 'sd' }, { elementId: 5823, text: '2323' }
        ],
        isSkipped: false,
        form: { id: 1025, name: 'Игра престолов: Кто завладеет Железным троном?' },
        isAnonymous: true,
        status: 'answered'
      }
    ],
    isAnswered: true,
    isClassic: false,
    user: {
      id: 89,
      name: 'Test',
      gender: 'male',
      hasPicture: false,
      email: 'test@test.rr',
      status: '',
      role: '',
      timezone: 'Z',
      termsApproved: false,
    }
  };

  private mockInputModel: any = {
    elements: [{
      caption: 'Test CAPTION',
      hint: '0007',
      id: 5897,
      kind: 'textfield',
      required: true,
      machineName: '53281fe6-c777-49e4-99e3-d3a1f2758748'
    }],
    id: 1026,
    machineName: '30250150-95b6-4056-be79-c27265fec66b',
    name: 'Test survey',
    showInAggregation: true
  };

  public saveBulk (model?: AssessmentModel[], queryParams?: IQueryParams): Observable<AssessmentModel> {
    return of(this.mockData);
  }

  public list() {
    return of({ data: [], meta: null });
  }
}

/* FormServiceStub stub */
@Injectable()
export class FormServiceStub {
  public clone(model: any): Observable<any> {
    return of(model);
  }

  public get(id, params): Observable<FormModel> {
    return of(new FormModel());
  }
}

/* ConfigurationService stub */
export class ConfigurationServiceStub {
  private _configData: IEnvConfig = {
    ENV: 'test',
    API: 'http://test/api',
    TITLE_MAIN: 'test',
    TITLE_NAV: 'test',
    PROVIDERS: {
      'google': {
        authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
        getParams: {
          response_type: 'code',
          client_id: '183984693644',
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          redirect_uri: 'http://localhost:5555/login/google'
        }
      }
    }
  };

  public loadConfigurationData() {
    return Promise.resolve();
  }

  public get config(): IEnvConfig {
    return this._configData;
  }
}
