export abstract class Model {
  protected _defaults: Object;

  public id: number | string;

  constructor(json?: Object) {
    Object.assign(this, this._defaults, json);
  }

  public toJson(): Object {
    // let json = JSON.stringify(this);
    // Object.keys(this).filter(key => key[0] === '_').forEach(key => {
    //   json = json.replace(key, key.substring(1));
    // });
    //
    // return json;
    return JSON.stringify(this);
  }
}
