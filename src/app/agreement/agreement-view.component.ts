import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Converter } from 'showdown';
import { HttpClient } from '@angular/common/http';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Config } from '../../environments/env.config';

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

  constructor(private _http: HttpClient, private _translate: TranslateService) {
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
    let path = `${Config.AGREEMENTS}/${this._language}.md`;
    this._http.get(path).pipe(
      // map(response => response.text()),
      map(response => response.toString()),
      map(text => {
        const converter = new Converter();
        return converter.makeHtml(text);
      }))
      .subscribe(agreement => this._agreement = agreement);
  }
}
