import { Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class SupportedLanguages {
  public static readonly EN: string = 'en';
  public static readonly RU: string = 'ru';
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
