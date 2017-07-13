import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: '<API_ENDPOINT>',
  TITLE_MAIN: 'Bitworks Staff Assessment System',
  TITLE_NAV: 'BW Assessment',
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

export = ProdConfig;

