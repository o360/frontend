import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../../../shared/config/translate-loader.config';

interface ILanguage {
  id: string;
  name: string;
  selected: boolean;
}

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
export class LanguageSelectorComponent implements OnInit {
  protected _languages: ILanguage[] = [];
  private _supportedLanguages: string[] = Object.values(SupportedLanguages);

  public get languages(): ILanguage[] {
    return this._languages;
  }

  public get supportedLanguages() {
    return this._supportedLanguages;
  }

  public get LanguagesTranslationMap() {
    return LanguagesTranslationMap;
  }

  constructor(protected _translate: TranslateService) {
  }

  public ngOnInit() {
    let selectedLangCode = this._getSelectedLangCode();

    this._languages = Object.values(SupportedLanguages).map(lang => ({
      id: lang,
      name: LanguagesTranslationMap[lang],
      selected: selectedLangCode === lang
    }));
    this._translate.use(selectedLangCode);
  }

  protected _getSelectedLangCode() {
    let browserLang = this._translate.getBrowserLang();
    if (localStorage.language) {
      return localStorage.language;
    } else {
      let i;
      for (i = 0; i < Object.values(SupportedLanguages).length; i++) {
        if (browserLang === Object.values(SupportedLanguages)[i]) {
          return browserLang;
        } else {
          return SupportedLanguages.EN;
        }
      }
    }
  }

  public changeLanguage(language: string) {
    this._languages.map(lang => {
      if (lang.id === language) {
        lang.selected = true;
        localStorage.language = lang.id;
        this._translate.use(lang.id);
      } else {
        lang.selected = false;
      }
    });
  }
}
