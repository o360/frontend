import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { IListResponse, RestService } from './rest.service';
import { GroupModel } from '../models/group-model';

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

  public setPicture(file: string): Observable<AccountModel> {
    let requestParams = `${this._getRequestParams()}/picture`;
    let requestOptions = new RequestOptions({
      headers: new Headers({
        'X-Auth-Token': this._authService.token
      })
    });

    let formData = new FormData();
    formData.append('picture', this._convertDataUriToBlob(file), 'pic.jpg');

    return this._http.post(requestParams, formData, requestOptions)
      .map((res: Response) => res.json())
      .catch((error: Response) => this._handleErrors(error));
  }

  public getGroups(): Observable<IListResponse<GroupModel>> {
    let requestParams = `${this._getRequestParams()}/groups`;
    let requestOptions = this._getRequestOptions();

    return this._http.get(requestParams, requestOptions)
      .map((response: Response) => response.json())
      .catch((error: Response) => this._handleErrors(error));
  }


  public list() {
    return Observable.throw('Method not allowed!');
  }

  public delete() {
    return Observable.throw('Method not allowed!');
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
