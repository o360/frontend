import { Injectable, Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, ResponseType, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { TestModel } from '../models/model.spec';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';
import { Model } from '../models/model';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';

export interface IListResponse<TestModel extends Model> {
  // meta: IResponseMeta;
  data: TestModel[];
}

/* Test Service */
@Injectable()
@RestServiceConfig({
  endpoint: '/api/',
  entityName: 'test',
  entityConstructor: TestModel
})
export class TestService extends RestService<TestModel> {
}

export class MockError extends Response implements Error {
  public name: string;
  public message: string;
}

export function main() {
  describe('RestService Service', () => {
    let testService: TestService;
    let injector: Injector;
    let mockBackend: MockBackend;
    let connection: MockConnection;
    let model: TestModel;

    beforeEach(() => {
      model = new TestModel();
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          TestService,
          { provide: NotificationService, useClass: NotificationServiceStub },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: Router, useClass: RouterStub },
          { provide: ConfirmationService, useClass: ConfirmationStub}
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(XHRBackend);
      testService = injector.get(TestService);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(TestService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof TestService).toBeTruthy();
    });

    it('should return an Observable when get() called', () => {
      let getResponse = testService.get(1);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });

    it('should return correct model on get() without params', () => {
      testService.get(1).subscribe((model: TestModel) => {
        expect(model.id).toEqual(1);
      });

      connection.mockRespond(new Response(new ResponseOptions({ body: { id: 1 }, type: ResponseType.Basic })));
    });
  });
}
