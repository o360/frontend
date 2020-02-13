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
 * Decorator for setting up a default values for model class.
 * Model class should be derived from Model class
 *
 * @example
 *
 * @Defaults({
 *   name: ''
 * })
 * class UserModel extends Model {
 *   public name: string;
 * }
 *
 */
export function Defaults(obj: Object): ClassDecorator {
  return function (target: any) {
    target.prototype._defaults = obj;

    return target;
  };
}
