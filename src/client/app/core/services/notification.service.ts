import { Injectable } from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  public customOptions: ToastOptions = {
    positionClass: '',
    maxShown: 1,
    newestOnTop: true,
    animate: '',
    toastLife: 1,
    enableHTML: false,
    dismiss: '',
    messageClass: '',
    titleClass: '',
    showCloseButton: true
  };

  constructor(protected _toast: ToastsManager,
              protected _translate: TranslateService) {
  }

  public showSuccess(message?: string, title?: string) {
    if (title && message) {
      this._toast.success(this._translateCustomText(message, 'T_SUCCESS_MESSAGE_'),
        this._translateCustomText(title, 'T_SUCCESS_TITLE_'));
    } else if (message) {
      this._toast.success(this._translateCustomText(message, 'T_SUCCESS_MESSAGE_'),
        this._translateDefaultText('T_SUCCESS_TITLE_DEFAULT'));
    } else {
      this._toast.success(this._translateDefaultText('T_SUCCESS_MESSAGE_DEFAULT'),
        this._translateDefaultText('T_SUCCESS_TITLE_DEFAULT'));
    }
  }

  public showError(message?: string, title?: string) {
    if (title && message) {
      this._toast.error(this._translateCustomText(message, 'T_ERROR_MESSAGE_'),
        this._translateCustomText(title, 'T_ERROR_TITLE_'));
    } else if (message) {
      this._toast.error(this._translateCustomText(message, 'T_SUCCESS_MESSAGE_'),
        this._translateDefaultText('T_ERROR_TITLE_DEFAULT'));
    } else {
      this._toast.error(this._translateDefaultText('T_ERROR_MESSAGE_DEFAULT'),
        this._translateDefaultText('T_ERROR_TITLE_DEFAULT'));
    }
  }

  public showWarning(message?: string, title?: string) {
    if (title && message) {
      this._toast.warning(this._translateCustomText(message, 'T_WARNING_MESSAGE_'),
        this._translateCustomText(title, 'T_WARNING_TITLE_'));
    } else if (message) {
      this._toast.warning(this._translateCustomText(message, 'T_WARNING_MESSAGE_'),
        this._translateDefaultText('T_WARNING_TITLE_DEFAULT'));
    } else {
      this._toast.warning(this._translateDefaultText('T_WARNING_MESSAGE_DEFAULT'),
        this._translateDefaultText('T_WARNING_TITLE_DEFAULT'));
    }
  }

  public showInfo(message?: string, title?: string) {
    if (title && message) {
      this._toast.info(this._translateCustomText(message, 'T_INFO_MESSAGE_'),
        this._translateCustomText(title, 'T_INFO_TITLE_'));
    } else if (message) {
      this._toast.info(this._translateCustomText(message, 'T_INFO_MESSAGE_'),
        this._translateDefaultText('T_INFO_TITLE_DEFAULT'));
    } else {
      this._toast.info(this._translateDefaultText('T_INFO_MESSAGE_DEFAULT'),
        this._translateDefaultText('T_INFO_TITLE_DEFAULT'));
    }
  }

  protected _translateCustomText(text: string, type: string) {
    return this._translate.instant(type + text.toUpperCase());
  }

  protected _translateDefaultText(text: string) {
    return this._translate.instant(text);
  }

  public clearAll() {
    return this._toast.clearAllToasts();
  }
}

