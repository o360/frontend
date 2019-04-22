import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  private _customOptions: Partial<GlobalConfig> = {
    timeOut: 5000,
    maxOpened: 5,
    newestOnTop: true,
    closeButton: true,
    positionClass: 'toast-top-right',
    messageClass: null,
    titleClass: 'font-bold',
    enableHtml: false,
    autoDismiss: false
  };

  constructor(protected _toastsManager: ToastrService,
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

  public clearAll() {
    // return this._toastsManager.clearAllToasts();
    // TODO need research for closing all opened toasts
    return this._toastsManager.clear();
  }

  protected _translateText(text: string) {
    return this._translate.instant(text);
  }
}
