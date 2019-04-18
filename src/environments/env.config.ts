import { AppInitService } from '../app/core/services/app-init.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvConfig } from './env-config.interface';

export let Config: EnvConfig = {
  ENV: 'LOCAL',
  API: '<API_ENDPOINT>',
  TITLE_MAIN: 'Open360',
  TITLE_NAV: 'Open360',
  PROVIDERS: {
    'google': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '<CLIENT_ID>',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: '<REDIRECT_URI>'
      }
    }
  }
};

export function initializeApp(appInitService: AppInitService) {
  return () => appInitService.init()
    .then((data: any) => data.json())
    .then((jsonData: EnvConfig) => {
      if (!!jsonData) {
        Config = jsonData;
      }
    })
    .catch((error: HttpErrorResponse) => Promise.resolve(error));
}
