import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'bs-language-selector',
  templateUrl: 'language-selector.component.html'
})
export class LanguageSelectorComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['ru', 'en']);
    let browserLang = translate.getBrowserLang();

    if (localStorage.language) {
      translate.use(localStorage.language);
    } else {
      translate.use(browserLang.match(/ru|en/) ? browserLang : 'en');
    }
  }

  public changeLang(language: string) {
    this.translate.use(language);
    localStorage.language = language;
  }
}
