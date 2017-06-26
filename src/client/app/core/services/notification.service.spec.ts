import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
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
import {
  AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub, ToastsManagerStub,
  TranslateServiceStub
} from '../../stubs/stubs.utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

export interface IListResponse<TestModel extends Model> {
  data: TestModel[];
}

// /* Test Service */
// @Injectable()
// @RestServiceConfig({
//   endpoint: '/api/',
//   entityName: 'test',
//   entityConstructor: TestModel
// })
// export class TestService extends RestService<TestModel> {
// }

export function main() {
  describe('NotificationService Service', () => {
    let testService: NotificationService;
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
          NotificationService,
          // { provide: ToastsManager, useClass: ToastsManagerStub },
          { provide: TranslateService, useClass: TranslateServiceStub },
          { provide: XHRBackend, useClass: MockBackend }
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(XHRBackend);
      testService = injector.get(NotificationService);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(NotificationService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof NotificationService).toBeTruthy();
    });

    // it('should return an Subject when loadComponent() called', () => {
    //   let getResponse = testService.loadComponent();
    //
    //   expect(getResponse).toEqual(jasmine.any(Subject));
    // });
  });
}
