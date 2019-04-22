import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { Observable } from 'rxjs';
import { AdminEventService } from './admin-event.service';
import { EventModel } from '../models/event-model';

describe('Admin Event Service', () => {
  let testService: AdminEventService;
  let injector: Injector;
  let model: EventModel;

  beforeEach(() => {
    model = new EventModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AdminEventService,
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub }
      ]
    });
    injector = getTestBed();
    testService = injector.get(AdminEventService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(AdminEventService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof AdminEventService).toBeTruthy();
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
