import { AppInitService } from '../app/core/services/app-init.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvConfig } from './env-config.interface';

export let Config: EnvConfig = {
  ENV: 'LOCAL',
  API: 'http://vm-a834f9ac-1c23-40f2-9461-618361703efd.premium.cs2.netpoint-dc.com:9000/api/v1.0',
  TITLE_MAIN: 'Open360',
  TITLE_NAV: 'Open360',
  PROVIDERS: {
    'google': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '183984693644-rrf60igolgdvtmdq5oue0opi3jvq4vl8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: 'http://localhost:5555/login/google'
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
