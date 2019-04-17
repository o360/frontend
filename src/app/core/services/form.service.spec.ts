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
import { FormService } from './form.service';


describe('FormService Service', () => {
  let testService: FormService;
  let injector: Injector;
  let model: FormModel;

  beforeEach(() => {
    model = new FormModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FormService,
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub}
      ]
    });
    injector = getTestBed();
    testService = injector.get(FormService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
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
