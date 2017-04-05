import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../../../shared/config/translate-loader.config';

export const LanguagesTranslationMap = {
  [SupportedLanguages.EN]: 'T_LANG_EN',
  [SupportedLanguages.RU]: 'T_LANG_RU'
};

@Component({
  moduleId: module.id,
  selector: 'bs-language-selector',
  templateUrl: 'language-selector.component.html',
  styleUrls: ['language-selector.component.css']
})
export class LanguageSelectorComponent {
  private _selectedLanguage: string;
  private _supportedLanguages: [string, string][];

  public get selectedLanguage(): string {
    return this._selectedLanguage;
  }

  public set selectedLanguage(value: string) {
    this._selectedLanguage = value;
  }

  public get supportedLanguages(): [string, string][] {
    return this._supportedLanguages;
  }

  constructor(protected _translate: TranslateService) {
    this._supportedLanguages = Object.entries(LanguagesTranslationMap);
    this._translate.addLangs(Object.keys(LanguagesTranslationMap));
    let browserLang = this._translate.getBrowserLang();

    if (localStorage.language) {
      this._selectedLanguage = localStorage.language;
      this._translate.use(this._selectedLanguage);
    } else {
      let i;
      for (i = 0; i < Object.values(SupportedLanguages).length; i++) {
        if (browserLang === Object.values(SupportedLanguages)[i]) {
          this._selectedLanguage = browserLang;
        } else {
          this._selectedLanguage = this._supportedLanguages[0][0];
        }
      }
      this._translate.use(this._selectedLanguage);
    }
  }

  public changeLang(language: string) {
    this._selectedLanguage = language;
    this._translate.use(this._selectedLanguage);
    localStorage.language = this._selectedLanguage;
  }
}
