export declare type ModelId = string | number;

export abstract class Model {
  protected _defaults: Object;

  public id: ModelId;

  constructor(json?: Object) {
    Object.assign(this, this._defaults, json);
  }

  public toJson(): Object {
    return JSON.stringify(this);
  }
}
