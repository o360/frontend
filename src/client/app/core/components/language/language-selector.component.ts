import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sequenceEqual } from 'rxjs/operator/sequenceEqual';

@Component({
  moduleId: module.id,
  selector: 'bs-language-selector',
  templateUrl: 'language-selector.component.html'
})
export class LanguageSelectorComponent {
  public selectedLanguage: string;

  constructor(protected _translate: TranslateService) {
    _translate.addLangs(['ru', 'en']);
    let browserLang = _translate.getBrowserLang();

    if (localStorage.language) {
      this.selectedLanguage = localStorage.language;
      _translate.use(this.selectedLanguage);
    } else {
      this.selectedLanguage = browserLang.match(/ru|en/) ? browserLang : 'en';
      _translate.use(this.selectedLanguage);
    }
  }

  public changeLang(language: string) {
    this.selectedLanguage = language;
    this._translate.use(this.selectedLanguage);
    localStorage.language = this.selectedLanguage;
  }

}
