import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { Config } from './shared/config/env.config';
import { SupportedLanguages } from './shared/config/translate-loader.config';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'bs-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(Config.DEFAULT_LANG);
    translate.use(SupportedLanguages.EN);
  }
}
