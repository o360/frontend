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
  private _languages: ILanguage[] = [];

  public get languages(): ILanguage[] {
    return this._languages;
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

  public changeLanguage(id: string) {
    this._languages.forEach(language => {
      if (language.id === id) {
        language.selected = true;
        localStorage.language = id;
        this._translate.use(id);
      } else {
        language.selected = false;
      }
    });
  }
}
