/**
 * Decorator for setting up not serializable properties.
 *
 * @example
 *
 * class UserModel extends Model {
 *    @NotSerializable() property: any;
 * }
 *
 */
export const Open360NotSerializeMetadataKey = 'open360-not-serializable';

export function NotSerializable(): PropertyDecorator {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(Open360NotSerializeMetadataKey, true, target, propertyKey);
  };
}
