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
  @NotSerializable() protected _defaults: Object;

  public id: ModelId;

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
