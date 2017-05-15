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


/* Test Service */
@Injectable()
@RestServiceConfig({
  endpoint: '/api/',
  entityName: 'test',
  entityConstructor: TestModel
})
export class TestService extends RestService<TestModel> {
}

export function main() {
  describe('RestService Service', () => {
    let testService: TestService;
    let injector: Injector;
    let mockBackend: MockBackend;
    let connection: MockConnection;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          TestService,
          { provide: NotificationService, useClass: NotificationServiceStub },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: Router, useClass: RouterStub }
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
