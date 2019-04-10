import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { NotificationService } from './notification.service';
import { ToastsManagerStub, TranslateServiceStub } from '../../stubs/stubs.utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastOptions, ToastsManager } from 'ng2-toastr/ng2-toastr';

export function main() {
  describe('Notification Service', () => {
    let testService: NotificationService;
    let toastsManager: ToastsManager;
    let injector: Injector;
    let mockBackend: MockBackend;
    let connection: MockConnection;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          NotificationService,
          ToastOptions,
          { provide: ToastsManager },
          { provide: TranslateService },
          { provide: HttpXhrBackend, useClass: MockBackend },
          // { provide: ToastsManager, useClass: ToastsManagerStub },
          // { provide: TranslateService, useClass: TranslateServiceStub },
          // { provide: HttpXhrBackend, useClass: MockBackend }
        ]
      });
      injector = getTestBed();
      mockBackend = <any>injector.get(HttpXhrBackend);
      testService = injector.get(NotificationService);
      toastsManager = injector.get(ToastsManager);
      mockBackend.connections.subscribe((c: MockConnection) => connection = c);
    });

    afterEach(() => {
      injector = undefined;
      mockBackend = undefined;
      testService = undefined;
      connection = undefined;
    });

    it('should be defined', () => {
      expect(NotificationService).toBeDefined();
      expect(testService).toBeDefined();
      expect(testService instanceof NotificationService).toBeTruthy();
    });

    it('should support 4 types of notifications', () => {
      // success
      const testSuccess = spyOn(toastsManager, 'success');
      testService.success('success');
      expect(testSuccess).toHaveBeenCalled();

      // warning
      const testWarning = spyOn(toastsManager, 'warning');
      testService.warning('warning');
      expect(testWarning).toHaveBeenCalled();

      // info
      const testInfo = spyOn(toastsManager, 'info');
      testService.info('info');
      expect(testInfo).toHaveBeenCalled();

      // error
      const testError = spyOn(toastsManager, 'error');
      testService.error('error');
      expect(testError).toHaveBeenCalled();
    });

    it('should clear all toasts', () => {
      const testClear = spyOn(toastsManager, 'clearAllToasts');
      testService.clearAll();
      expect(testClear).toHaveBeenCalled();
    });
  });
}
