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
          { provide: ConfirmationService, useClass: ConfirmationStub }
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

    it('should throw if model was not found by id', () => {
      testService.get('unknown-id').subscribe(model => {
          expect(model.id).toBeNull();
        },
        error => expect(error).toBeDefined()
      );
    });

    it('should return an Observable when save() called with new model', () => {
      let getResponse = testService.save(model);

      expect(getResponse).toEqual(jasmine.any(Observable));
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
        .subscribe(res => {
          expect(res.data.length).toBe(0, 'should have no model');
        });
    });

    it('should return an Observable when delete() called', () => {
      let getResponse = testService.delete(1);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });
  });
}
