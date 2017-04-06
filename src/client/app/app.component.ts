import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { Config } from './shared/config/env.config';
import { SupportedLanguages } from './shared/config/translate-loader.config';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'bs-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(protected _translate: TranslateService) {
    let selectedLangCode = this._getSelectedLangCode();
    this._translate.use(selectedLangCode);
  }

  protected _getSelectedLangCode() {
    if (localStorage.language) {
      return localStorage.language;
    } else {
      let browserLang = this._translate.getBrowserLang();
      let lang = Object.values(SupportedLanguages).find(x => x === browserLang);

      return lang || Config.DEFAULT_LANG;
    }
  }
}
