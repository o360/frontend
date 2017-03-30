export function Defaults(obj: Object): ClassDecorator {
  return function (target: Function) {
    target.prototype._defaults = obj;

    return target;
  };
}
