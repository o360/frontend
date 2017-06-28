import { MdlDialogOutletModule } from '@angular-mdl/core';
import { ComponentFactoryResolver, Injectable, Injector, NgModule } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './';
import { INotificationStatus, JobsNotificationService } from './jobs-notification.service';
import { UtilsService } from './utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from './confirmation.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ConfirmationModalComponent } from '../../shared/confirmation/confirmation.component';

describe('ConfirmationService service', () => {
  let confirmService: ConfirmationService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ConfirmationService,
        { provide: ComponentFactoryResolver, useClass: ComponentFactoryResolver },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
    injector = getTestBed();
    confirmService = injector.get(ConfirmationService);
  });

  afterEach(() => {
    confirmService = undefined;
  });

  it('should be defined', () => {
    expect(ConfirmationService).toBeDefined();
    expect(confirmService).toBeDefined();
    expect(confirmService instanceof ConfirmationService).toBeTruthy();
  });
  //
  // it('should return an Subject when loadComponent() called', () => {
  //   // let getViewContainer = ConfirmationModalStub
  //   let getResponse = confirmService.loadComponent();
  //
  //   expect(getResponse).toEqual(jasmine.any(Subject));
  // });
});

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  entryComponents: [ConfirmationModalComponent],
})
export class TestModule {

}
/* TranslateServiceStub stub */
@Injectable()
export class TranslateServiceStub {
  setDefaultLang() {
    return;
  }
}
