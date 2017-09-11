import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';

@RestServiceConfig({
  endpoint: 'users',
  entityName: 'current',
  entityConstructor: AccountModel
})
export class AccountService extends RestService<AccountModel> {
  public get(token: string): Observable<AccountModel> {
    let params = this._getRequestParams();
    let options = this._getRequestOptions();

    return this._http.get(params, options)
      .map((response: Response) => response.json())
      .map((json: Object) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  public list() {
    return Observable.throw('Method not allowed!');
  }

  public delete() {
    return Observable.throw('Method not allowed!');
  }

  public setPicture(id: ModelId, file: FormData): Observable<AccountModel> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'X-Auth-Token': this._authService.token
      })
    });

    return this._http.post(requestParams, file, requestOptions)
      .map((res: Response) => res.json())
      .catch((error: Response) => this._handleErrors(error));
  }

  protected _update(model: AccountModel): Observable<AccountModel> {
    let requestParams = this._getRequestParams();
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }
}
