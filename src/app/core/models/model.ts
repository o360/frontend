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

import { NotSerializable, Open360NotSerializeMetadataKey } from '../decorators/not-serializable.decorator';
import { Utils } from '../../utils';

export declare type ModelId = string | number;

/**
 * Base class for data with common method and properties.
 *
 * All models used in RestService derived classes should extend this class.
 *
 */
export abstract class Model {
  public id: ModelId;

  @NotSerializable() protected _defaults: Object;

  constructor(json?: Object) {
    Object.assign(this, this._defaults, json);
  }

  /**
   * Convert a object into a string
   * @params {object} - model object
   * @return {string}
   */
  public toJson(): Object {
    return this._serialize(this);
  }

  protected _serialize(model: any): Object {
    let object: any = {};
    let target = Object.getPrototypeOf(model);
    for (let prop in model) {
      let notSerializable = Reflect.getMetadata(Open360NotSerializeMetadataKey, target, prop);

      if (!notSerializable && !Utils.isFunction(model[prop])) {
        object[prop] = model[prop];
      }
    }

    return object;
  }
}
