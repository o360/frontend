/**
 * Decorator for setting up not serializable properties for model class.
 * Model class should be derived from Model class
 *
 * @example
 *
 * @NotSerializable({
 *   name: true
 * })
 * class UserModel extends Model {
 *   public name: string;
 * }
 *
 */

export function NotSerializable(obj: Object): ClassDecorator {
  return function (target: any) {

    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        target[key] = null;
      }
    });

    return target;
  };
}
