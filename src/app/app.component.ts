import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
              private _configService: ConfigurationService) {
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
