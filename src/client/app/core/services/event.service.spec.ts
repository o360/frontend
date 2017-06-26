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
import { EventService } from './event.service';
import { EventModel } from '../models/event-model';


export function main() {
  describe('EventService Service', () => {
    let testService: EventService;
    let injector: Injector;
    let mockBackend: MockBackend;
    let connection: MockConnection;
    let model: EventModel;

    beforeEach(() => {
      model = new EventModel();
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          EventService,
          { provide: NotificationService, useClass: NotificationServiceStub },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: Router, useClass: RouterStub },
          { provide: ConfirmationService, useClass: ConfirmationStub}
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(XHRBackend);
      testService = injector.get(EventService);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(EventService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof EventService).toBeTruthy();
    });

    it('should return an Observable when clone() called', () => {
      let getResponse = testService.clone(model);

      expect(getResponse).toEqual(jasmine.any(Observable));
    });

    it('should return an Observable when addProject() called', () => {
      let getResponse = testService.addProject();

      expect(getResponse).toEqual(jasmine.any(Observable));
    });

    it('should return an Observable when removeProject() called', () => {
      let getResponse = testService.removeProject();

      expect(getResponse).toEqual(jasmine.any(Observable));
    });
  });
}
