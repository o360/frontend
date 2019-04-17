import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { Observable } from 'rxjs';
import { FormModel } from '../models/form-model';
import { AdminFormService } from './admin-form.service';

describe('AdminFormService Service', () => {
  let testService: AdminFormService;
  let injector: Injector;
  let model: FormModel;

  beforeEach(() => {
    model = new FormModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AdminFormService,
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub}
      ]
    });
    injector = getTestBed();
    testService = injector.get(AdminFormService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(AdminFormService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof AdminFormService).toBeTruthy();
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
