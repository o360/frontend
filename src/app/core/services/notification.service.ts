/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
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
