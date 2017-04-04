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
  return function (target: Function) {
    target.prototype._defaults = obj;

    return target;
  };
}
