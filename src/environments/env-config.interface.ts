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

// Feel free to extend this interface
// depending on your app specific config.
export interface IEnvConfig {
  // API address
  API?: string;
  /** Configurations for social auth providers
   * for more info follow the links
   * facebook: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
   * vk: https://vk.com/dev/auth_sites
   * google: https://developers.google.com/identity/protocols/OAuth2WebServer
   * See /src/deploy-configs/example.json for example
   */
  PROVIDERS?: any;
  // Environment name
  ENV?: string;
  // Language code to be used by default
  DEFAULT_LANG?: string;
  TITLE_MAIN?: string;
  TITLE_NAV?: string;
  // Path to folder with agreements .md files
  AGREEMENTS?: string;
}
