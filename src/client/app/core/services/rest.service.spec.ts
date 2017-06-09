import { Injectable, Injector } from '@angular/core';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { HttpModule, RequestMethod, Response, ResponseOptions, ResponseType, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { TestModel } from '../models/model.spec';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';
import { Model } from '../models/model';


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
        expect(model instanceof TestModel).toBeTruthy();
        expect(model.id).toEqual(1);
      });

      connection.mockRespond(new Response(new ResponseOptions({ body: { id: 1 }, type: ResponseType.Basic })));
    });

    it('should throw if model was not found by id', () => {
      testService.get('unknown-id').subscribe(() => {
        },
        error => expect(error).toBeDefined()
      );
    });

    it('should return an Observable when save() called with new model', () => {
      let getResponse = testService.save(model);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });

    it('should call create with new model', () => {
      const templateSave = spyOn(testService, 'save').and.callThrough();
      const templateCreate = spyOn(testService, '_create').and.callThrough();
      const templateUpdate = spyOn(testService, '_update').and.callThrough();

      testService.save(model).subscribe();
      expect(templateSave).toHaveBeenCalledTimes(1);
      expect(templateCreate).toHaveBeenCalledTimes(1);
      expect(templateUpdate).toHaveBeenCalledTimes(0);
    });

    it('should call update with if model exist', () => {
      const templateSave = spyOn(testService, 'save').and.callThrough();
      const templateCreate = spyOn(testService, '_create').and.callThrough();
      const templateUpdate = spyOn(testService, '_update').and.callThrough();

      model.id = 1;
      testService.save(model).subscribe();
      expect(templateSave).toHaveBeenCalledTimes(1);
      expect(templateCreate).toHaveBeenCalledTimes(0);
      expect(templateUpdate).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable when save() called with new model without params', () => {
      testService.save(model).subscribe((model: TestModel) => {
        expect(model).toEqual(model);
      });

      connection.mockRespond(new Response(new ResponseOptions({ body: { model }, type: ResponseType.Basic })));
    });

    it('should return correct model on list() without params', () => {
      let modelList: IListResponse<TestModel> = { data: [model] };
      testService.list().subscribe((model: IListResponse<TestModel>) => {
        expect(model).toEqual(modelList);
      });

      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(modelList), type: ResponseType.Basic })));
    });

    it('should return correct model on list() with query params', () => {
      let queryParams = { sort: 'data1' };
      let modelList: IListResponse<TestModel> = { data: [model] };
      testService.list(queryParams).subscribe((model: IListResponse<TestModel>) => {
        expect(model).toEqual(modelList);
      });

      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(modelList), type: ResponseType.Basic })));
    });

    it('should be OK returning empty model when list() called', () => {
      testService.list()
        .do(res => {
          expect(res.data.length).toBe(0, 'should have no model');
        })
        .toPromise();
    });

    it('should return an Observable when delete() called', () => {
      let getResponse = testService.delete(1);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });
  });
}
