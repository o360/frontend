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
  return (target: any) => {
    target.prototype._notSerializable = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        target.prototype._notSerializable[key] = null;
      }
    });

    return target;
  };
}
