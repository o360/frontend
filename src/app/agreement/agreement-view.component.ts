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

import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Converter } from 'showdown';
import { HttpClient } from '@angular/common/http';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from '../core/services/configuration.service';

@Component({
  selector: 'bs-agreement-view',
  template: '<div [innerHTML]="agreement"></div>'
})
export class AgreementViewComponent implements OnInit {
  private _language: string;
  private _agreement: string;

  public get agreement(): string {
    return this._agreement;
  }

  constructor(private _http: HttpClient,
              private _translate: TranslateService,
              private _configService: ConfigurationService) {
  }

  public ngOnInit() {
    this._language = this._translate.currentLang;
    this._readFile();
    this._translate.onLangChange.subscribe((e: LangChangeEvent) => {
      this._language = e.lang;
      this._readFile();
    });
  }

  protected _readFile() {
    let path = `${this._configService.config.AGREEMENTS}/${this._language}.md`;

    this._http.get(path, { responseType: 'text' })
      .pipe(
        map(response => response.toString()),
        map((text) => {
          const converter = new Converter();

          return converter.makeHtml(text);
        })
      )
      .subscribe(agreement => this._agreement = agreement);
  }
}
