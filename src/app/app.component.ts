// import { Component, ViewContainerRef } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { Config } from '../environments/env.config';
import { SupportedLanguages } from './shared/config/translate-loader.config';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { ToastrService } from 'ngx-toastr';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'bs-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(protected _translate: TranslateService,
              // protected _toastsManager: ToastrService,
              // public viewContainerRef: ViewContainerRef) {
              ) {
    this._translateConfig();
    // this._toastsManager.setRootViewContainerRef(viewContainerRef);
  }

  protected _translateConfig() {
    this._translate.addLangs(Object.values(SupportedLanguages));
    this._translate.use(this._getSelectedLangCode());
  }

  protected _getSelectedLangCode() {
    if (localStorage.language) {
      return localStorage.language;
    } else {
      const browserLang = this._translate.getBrowserLang();
      const lang = Object.values(SupportedLanguages).find(x => x === browserLang);

      return lang || Config.DEFAULT_LANG;
    }
  }
}
