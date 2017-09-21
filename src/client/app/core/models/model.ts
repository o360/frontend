export declare type ModelId = string | number;

/**
 * Base class for data with common method and properties.
 *
 * All models used in RestService derived classes should extend this class.
 *
 */
export abstract class Model {
  protected _defaults: Object;
  protected _notSerializable: Object;

  public id: ModelId;

  constructor(json?: Object) {
    Object.assign(this, this._defaults, json);
  }

  /**
   * Convert a object into a string
   * @params {object} - model object
   * @return {string}
   */
  public toJson(): string {
    return this._serialize();
  }

  protected _serialize(): string {
    let obj = Object.assign({}, this, this._notSerializable);
    return JSON.stringify(obj);
  }
}
