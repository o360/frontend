import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

export class SupportedLanguages {
  public static readonly EN: string = 'en';
  public static readonly RU: string = 'ru';
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
