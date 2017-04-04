/**
 * Rest service config params interface
 */
interface IRestServiceParams {
  endpoint?: string;
  entityName: string;
  entityConstructor: any;
}

/**
 * Decorator for a specific service that is extended by a RestService.
 * Allows to configure rest service api endpoint and model constructor
 *
 * @params {IRestServiceParams}
 * @return {Function}
 *
 * @example
 *
 * @RestServiceConfig({
 *   entityName: 'user',
 *   entityConstructor: UserModel
 * })
 * class UserService extends RestService<UserModel> {
 * }
 *
 */
export function RestServiceConfig(params: IRestServiceParams): ClassDecorator {
  return function (target: Function) {
    if (params.endpoint && params.endpoint !== '') {
      target.prototype._endpoint = params.endpoint;
    }

    target.prototype._entityName = params.entityName;
    target.prototype._entityConstructor = params.entityConstructor;

    return target;
  };
}
