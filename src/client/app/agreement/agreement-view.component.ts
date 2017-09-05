import { Component, OnInit } from '@angular/core';
import { Converter } from 'showdown';
import { Http } from '@angular/http';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Config } from '../shared/config/env.config';


@Component({
  moduleId: module.id,
  selector: 'bs-agreement-view',
  template: '<div [innerHTML]="agreement"></div>'
})
export class AgreementViewComponent implements OnInit {
  private _language: string;
  private _agreement: string;

  public get agreement(): string {
    return this._agreement;
  }

  constructor(private _http: Http, private _translate: TranslateService) {
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
    this._http.get(path)
      .map(response => response.text())
      .map(text => {
        const converter = new Converter();
        return converter.makeHtml(text);
      })
      .subscribe(agreement => this._agreement = agreement);
  }
}
