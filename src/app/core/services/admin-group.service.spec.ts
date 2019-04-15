import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { AdminGroupService } from './admin-group.service';
import { GroupModel } from '../models/group-model';
import { Observable } from 'rxjs';

describe('AdminEventService Service', () => {
  let testService: AdminGroupService;
  let injector: Injector;
  let model: GroupModel;

  beforeEach(() => {
    model = new GroupModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AdminGroupService,
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub }
      ]
    });
    injector = getTestBed();
    testService = injector.get(AdminGroupService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(AdminGroupService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof AdminGroupService).toBeTruthy();
  });

  it('should return an Observable when addUser() called', () => {
    let getResponse = testService.addUser();

    expect(getResponse).toEqual(jasmine.any(Observable));
  });

  it('should return an Observable when removeUser() called', () => {
    let getResponse = testService.removeUser();

    expect(getResponse).toEqual(jasmine.any(Observable));
  });
});
