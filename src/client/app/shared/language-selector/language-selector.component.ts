import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../config/translate-loader.config';

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
  private _selected: string;
  private _directionDown: boolean;

  public get languages(): ILanguage[] {
    return this._languages;
  }

  public get selected(): string {
    return this._selected;
  }

  @Input()
  public set directionDown(value: boolean) {
    this._directionDown = typeof value === 'boolean' ? value : true;
  }

  public get directionDown(): boolean {
    return this._directionDown;
  }

  constructor(protected _translate: TranslateService) {
  }

  public ngOnInit() {
    this._selected = this._translate.currentLang;
    this._languages = Object.values(SupportedLanguages).map(lang => ({
      id: lang,
      name: LanguagesTranslationMap[lang],
      selected: this._selected === lang
    }));
  }

  public changeLanguage(id: string) {
    this._languages.forEach(language => {
      if (language.id === id) {
        language.selected = true;
        localStorage.language = id;
        this._translate.use(id);
        this._selected = id;
      } else {
        language.selected = false;
      }
    });
  }
}
