export abstract class Model {
  protected _defaults: Object;

  public id: number;

  constructor(json?: Object) {
    Object.assign(this, this._defaults, json);
  }

  public toJson(): Object {
    return JSON.stringify(this);
  }
}
