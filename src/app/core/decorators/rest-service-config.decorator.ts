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

/**
 * Rest service config params interface
 */
interface IRestServiceParams {
  endpoint?: string;
  entityName: string;
  entityConstructor: any;
}

/**
 * Decorator for a specific service that is extended by a RestService.
 * Allows to configure rest service api endpoint and model constructor
 *
 * @params {IRestServiceParams}
 * @return {Function}
 *
 * @example
 *
 * @RestServiceConfig({
 *   entityName: 'user',
 *   entityConstructor: UserModel
 * })
 * class UserService extends RestService<UserModel> {
 * }
 *
 */
export function RestServiceConfig(params: IRestServiceParams): ClassDecorator {
  return function (target: any) {
    if (params.endpoint && params.endpoint !== '') {
      target.prototype._endpoint = params.endpoint;
    }

    target.prototype._entityName = params.entityName;
    target.prototype._entityConstructor = params.entityConstructor;

    return target;
  };
}
