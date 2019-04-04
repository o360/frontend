import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { Observable } from 'rxjs/Observable';
import { FormModel } from '../models/form-model';
import { FormService } from './form.service';


export function main() {
  describe('FormService Service', () => {
    let testService: FormService;
    let injector: Injector;
    let mockBackend: MockBackend;
    let connection: MockConnection;
    let model: FormModel;

    beforeEach(() => {
      model = new FormModel();
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          FormService,
          { provide: NotificationService, useClass: NotificationServiceStub },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: Router, useClass: RouterStub },
          { provide: ConfirmationService, useClass: ConfirmationStub}
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(XHRBackend);
      testService = injector.get(FormService);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(FormService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof FormService).toBeTruthy();
    });

    it('should return an Observable when clone() called', () => {
      let getResponse = testService.clone(model);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });

    it('should call load', () => {
      const testSave = spyOn(testService, 'save');

      testService.clone(model);
      expect(testSave).toHaveBeenCalled();
    });
  });
}
