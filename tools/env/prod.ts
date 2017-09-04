import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'https://sop.bw-sw.com/api/v1.0',
  TITLE_MAIN: 'Open360',
  TITLE_NAV: 'Open360',
  PROVIDERS: {
    'google': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '127600832093-e6ka9ie7hvmp6ji8k1t3mp1l2uk9vgpl.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: 'https://sop.bw-sw.com/login/google'
      }
    }
  }
};

export = ProdConfig;

