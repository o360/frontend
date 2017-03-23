export abstract class Model {
  public  id: number;

  constructor(json: Object) {
    Object.assign(this, json);
  }
//  toJson()
}
