import { Injectable } from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  private _customOptions: ToastOptions = {
    toastLife: 5000,
    newestOnTop:  true,
    maxShown: 5,
    showCloseButton: true,
    animate:'fade',
    positionClass:'toast-top-right',
    messageClass: null,
    titleClass:'font-bold'
  };

  constructor(protected _toastsManager: ToastsManager,
              protected _translate: TranslateService) {
  }

  public success(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_SUCCESS_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_SUCCESS_TITLE_DEFAULT';
    messageText = this._prepareMessage(messageText, 'T_SUCCESS_MESSAGE_');
    titleText = this._prepareMessage(titleText, 'T_SUCCESS_TITLE_');
    this._toastsManager.success(messageText, titleText, this._customOptions);
  }

  public error(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_ERROR_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_ERROR_TITLE_DEFAULT';
    messageText = this._prepareMessage(messageText, 'T_ERROR_MESSAGE_');
    titleText = this._prepareMessage(titleText, 'T_ERROR_TITLE_');
    this._toastsManager.error(messageText, titleText, this._customOptions);
  }

  public warning(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_WARNING_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_WARNING_TITLE_DEFAULT';
    messageText = this._prepareMessage(messageText, 'T_WARNING_MESSAGE_');
    titleText = this._prepareMessage(titleText, 'T_WARNING_TITLE_');
    this._toastsManager.warning(messageText, titleText, this._customOptions);
  }

  public info(message?: string, title?: string) {
    let messageText = message && message.length ? message : 'T_INFO_MESSAGE_DEFAULT';
    let titleText = title && title.length ? title : 'T_INFO_TITLE_DEFAULT';
    messageText = this._prepareMessage(messageText, 'T_INFO_MESSAGE_');
    titleText = this._prepareMessage(titleText, 'T_INFO_TITLE_');
    this._toastsManager.info(messageText, titleText, this._customOptions);
  }

  protected _prepareMessage(text: string, type?: string) {
    let translate = type ? (type + text.toUpperCase()) : text;
    return this._translate.instant(translate);
  }

  public clearAll() {
    return this._toastsManager.clearAllToasts();
  }
}

