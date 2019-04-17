import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

describe('Notification Service', () => {
  let testService: NotificationService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NotificationService,
        { provide: ToastrService },
        { provide: TranslateService },
      ]
    });
    injector = getTestBed();
    testService = injector.get(NotificationService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(NotificationService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof NotificationService).toBeTruthy();
  });

  it('should support 4 types of notifications', () => {
    // success
    const testSuccess = spyOn(testService, 'success');
    testService.success('success');
    expect(testSuccess).toHaveBeenCalled();

    // warning
    const testWarning = spyOn(testService, 'warning');
    testService.warning('warning');
    expect(testWarning).toHaveBeenCalled();

    // info
    const testInfo = spyOn(testService, 'info');
    testService.info('info');
    expect(testInfo).toHaveBeenCalled();

    // error
    const testError = spyOn(testService, 'error');
    testService.error('error');
    expect(testError).toHaveBeenCalled();
  });
});
