import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
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
  },
  USERS_FILTERS: [{
    name: 'status',
    values: ['all', 'new', 'approved']
  }, {
    name: 'role',
    values: ['all', 'user', 'admin']
  }, {
    name: 'sort',
    values: ['id', 'name', 'email', 'role', 'status']
  }]
};
export = DevConfig;

