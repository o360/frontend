import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../../../shared/config/translate-loader.config';
import { Config } from '../../../shared/config/env.config';

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
    this._languages = Object.values(SupportedLanguages).map(lang => ({
      id: lang,
      name: LanguagesTranslationMap[lang],
      selected: this._translate.currentLang === lang
    }));
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
