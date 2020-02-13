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

import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../config/translate-loader.config';
import * as moment from 'moment';
import 'moment/locale/ru';

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
  selector: 'bs-language-selector',
  templateUrl: 'language-selector.component.html',
  styleUrls: ['language-selector.component.scss']
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
    let language = this._translate.currentLang;
    this._selected = language;
    moment.locale(language);
    this._languages = Object.values(SupportedLanguages).map(lang => ({
      id: lang,
      name: LanguagesTranslationMap[lang],
      selected: this._selected === lang
    }));
  }

  public changeLanguage(id: string) {
    moment.locale(id);
    this._languages.forEach((language) => {
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
