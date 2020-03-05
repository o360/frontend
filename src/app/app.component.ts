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

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterHistoryService } from './core/services/router-history.service';
import { SupportedLanguages } from './shared/config/translate-loader.config';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { ConfigurationService } from './core/services/configuration.service';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'bs-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(protected _translate: TranslateService,
              private _configService: ConfigurationService,
              private _routerHistoryService: RouterHistoryService) {
    this._routerHistoryService.subscribe();
    this._translateConfig();
  }

  protected _translateConfig() {
    registerLocaleData(ru, 'ru');
    this._translate.addLangs(Object.values(SupportedLanguages));
    this._translate.use(this._getSelectedLangCode());
  }

  protected _getSelectedLangCode() {
    if (localStorage.language) {
      return localStorage.language;
    }
    const browserLang = this._translate.getBrowserLang();
    const lang = Object.values(SupportedLanguages).find(x => x === browserLang);

    return lang || this._configService.config.DEFAULT_LANG;
  }
}
