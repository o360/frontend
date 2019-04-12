import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ConfirmationService } from './confirmation.service';
import { AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { AdminEmailTemplateService } from './admin-email-template.service';
import { Observable } from 'rxjs';
import { EmailTemplateModel } from '../models/email-template-model';


describe('AdminEmailTemplateService Service', () => {
  let testService: AdminEmailTemplateService;
  let injector: Injector;
  let model: EmailTemplateModel;

  beforeEach(() => {
    model = new EmailTemplateModel();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AdminEmailTemplateService,
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub}
      ]
    });
    injector = getTestBed();
    testService = injector.get(AdminEmailTemplateService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(AdminEmailTemplateService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof AdminEmailTemplateService).toBeTruthy();
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
