import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../environments/env.config';
import { SupportedLanguages } from './shared/config/translate-loader.config';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'bs-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(protected _translate: TranslateService) {
    this._translateConfig();
  }

  protected _translateConfig() {
    registerLocaleData(localeRu, 'ru');
    this._translate.addLangs(Object.values(SupportedLanguages));
    this._translate.use(this._getSelectedLangCode());
  }

  protected _getSelectedLangCode() {
    if (localStorage.language) {
      return localStorage.language;
    } else {
      const browserLang = this._translate.getBrowserLang();
      const lang = Object.values(SupportedLanguages).find(x => x === browserLang);

      return lang || Config.DEFAULT_LANG;
    }
  }
}
