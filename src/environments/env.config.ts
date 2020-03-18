/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IEnvConfig } from './env-config.interface';

export const Config: IEnvConfig = {
  ENV: 'LOCAL',
  API: '',
  TITLE_MAIN: 'Open360',
  TITLE_NAV: 'Open360',
  PROVIDERS: {
    'GOOGLE': {
      authorizationUrlBase: 'https://accounts.google.com/o/oauth2/auth',
      getParams: {
        response_type: 'code',
        client_id: '',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        redirect_uri: 'http://localhost:5555/login/google'
      }
    }
  },
  DEFAULT_LANG: 'en',
  AGREEMENTS: '/assets/agreement'
};
