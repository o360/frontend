import { Injectable } from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  private _customOptions: ToastOptions = {
    toastLife: 5000,
    newestOnTop: true,
    maxShown: 5,
    showCloseButton: true,
    animate: 'fade',
    positionClass: 'toast-top-right',
    messageClass: null,
    titleClass: 'font-bold',
    enableHTML: false,
    dismiss: ''
  };

  constructor(protected _toastsManager: ToastsManager,
              protected _translate: TranslateService) {
  }

  public success(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_SUCCESS_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_SUCCESS_TITLE_DEFAULT';
    this._toastsManager.success(this._translateText(messageText), this._translateText(titleText), this._customOptions);
  }

  public error(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_ERROR_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_ERROR_TITLE_DEFAULT';
    this._toastsManager.error(this._translateText(messageText), this._translateText(titleText), this._customOptions);
  }

  public warning(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_WARNING_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_WARNING_TITLE_DEFAULT';
    this._toastsManager.warning(this._translateText(messageText), this._translateText(titleText), this._customOptions);
  }

  public info(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_INFO_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_INFO_TITLE_DEFAULT';
    this._toastsManager.info(this._translateText(messageText), this._translateText(titleText), this._customOptions);
  }

  protected _translateText(text: string) {
    return this._translate.instant(text);
  }

  public clearAll() {
    return this._toastsManager.clearAllToasts();
  }
}

