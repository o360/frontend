import { EnvConfig } from './env-config.interface';
import { environment } from './environment';

export const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'https://open360.bw-sw.com/api/v1.0',
  TITLE_MAIN: 'Open360',
  TITLE_NAV: 'Open360',
  PROVIDERS: {
    'google': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '127600832093-e6ka9ie7hvmp6ji8k1t3mp1l2uk9vgpl.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: 'https://open360.bw-sw.com/login/google'
      }
    }
  }
};

export const DevConfig: EnvConfig = {
  ENV: 'DEV',
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
        redirect_uri: 'http://vm-a834f9ac-1c23-40f2-9461-618361703efd.premium.cs2.netpoint-dc.com/login/google'
      }
    }
  }
};

export const Config: EnvConfig = environment.production ? ProdConfig : DevConfig;
