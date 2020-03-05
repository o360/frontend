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

import { RestService } from './rest.service';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { TestModel } from '../models/model.spec';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Model } from '../models/model';
import { ConfirmationService } from './confirmation.service';
import {
  AuthServiceStub,
  ConfigurationServiceStub,
  ConfirmationStub,
  NotificationServiceStub,
  RestServiceStub,
  RouterStub
} from '../../stubs/stubs.utils';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

export interface IListResponse<TestModel extends Model> {
  data: TestModel[];
}

/* Test Service */
@Injectable()
@RestServiceConfig({
  endpoint: '/api/',
  entityName: 'test',
  entityConstructor: TestModel
})
export class TestService extends RestService<TestModel> {}

describe('RestService Service', () => {
  let testService: RestService<TestModel>;
  let injector: Injector;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let model: TestModel;

  beforeEach(() => {
    model = new TestModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: RestService, useClass: RestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub },
        { provide: ConfigurationService, useClass: ConfigurationServiceStub }
      ]
    });
    injector = getTestBed();
    testService = <any>TestBed.inject(RestService);
    httpClient =  TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(RestService).toBeDefined();
    expect(testService).toBeDefined();
  });

  it('should return an Observable when get() called', () => {
    let getResponse = testService.get(1);

    expect(getResponse).toEqual(jasmine.any(Observable));
  });

  it('should return correct model on get() without params', () => {
    testService.get(1).subscribe((model: TestModel) => {
      expect(model.id).toEqual(1);
    });
  });

  it('should return an Observable when save() called with new model', () => {
    let getResponse = testService.save(model);

    expect(getResponse).toEqual(jasmine.any(Observable));
  });

  it('should return an Observable when save() called with new model without params', () => {
    testService.save(model).subscribe((model: TestModel) => {
      expect(model).toEqual(model);
    });
  });

  it('should return correct model on list() without params', () => {
    let modelList: IListResponse<TestModel> = { data: [model] };
    testService.list().subscribe((model: IListResponse<TestModel>) => {
      expect(model).toEqual(modelList);
    });
  });

  it('should return correct model on list() with query params', () => {
    let queryParams = { sort: 'data1' };
    let modelList: IListResponse<TestModel> = { data: [model] };
    testService.list(queryParams).subscribe((model: IListResponse<TestModel>) => {
      expect(model).toEqual(modelList);
    });
  });

  it('should return an Observable when delete() called', () => {
    let getResponse = testService.delete(1);

    expect(getResponse).toEqual(jasmine.any(Observable));
  });
});
