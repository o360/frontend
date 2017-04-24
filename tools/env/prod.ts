import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'http://sop-ci.z1.netpoint-dc.com:9000/api/v1.0',
  PROVIDERS: {
    'google': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '183984693644-rrf60igolgdvtmdq5oue0opi3jvq4vl8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: 'http://sop-ci.z1.netpoint-dc.com/login/google'
      }
    }
  }
};

export = ProdConfig;

