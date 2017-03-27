interface IRestServiceParams {
  endpoint?: string;
  entityName: string;
  entityConstructor: any;
}

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
