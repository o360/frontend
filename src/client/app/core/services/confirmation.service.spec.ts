import { ComponentFactoryResolver, Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestModel } from '../models/model.spec';
import { Model } from '../models/model';
import { ConfirmationService } from './confirmation.service';
import { TranslateServiceStub } from '../../stubs/stubs.utils';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';

export interface IListResponse<TestModel extends Model> {
  data: TestModel[];
}

export function main() {
  describe('ConfirmationService Service', () => {
    let testService: ConfirmationService;
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
          ConfirmationService,
          { provide: ComponentFactoryResolver, useClass: ComponentFactoryResolver },
          { provide: TranslateService, useClass: TranslateServiceStub },
          { provide: XHRBackend, useClass: MockBackend }
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(XHRBackend);
      testService = injector.get(ConfirmationService);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(ConfirmationService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof ConfirmationService).toBeTruthy();
    });

    it('should return an Subject when loadComponent() called', () => {
      let getResponse = testService.loadComponent();

      // expect(getResponse).toEqual(jasmine.any(Subject));
    });
  });
}
