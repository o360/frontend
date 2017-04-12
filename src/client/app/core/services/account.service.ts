import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';
import { Config } from '../../shared/config/env.config';

@RestServiceConfig({
  entityName: 'auth',
  entityConstructor: UserModel
})
export class AccountService extends RestService<UserModel> {
  protected _host = Config.API;

  constructor(http: Http) {
    super(http);
  }

  public authenticate(provider: string, code: string): Observable<string> {
    let body = JSON.stringify({ 'code': code });
    let url = [this._host, this._entityName, provider].join('/'); // @todo: rest service refactoring

    return this._http.post(url, body, this._getRequestOptions())
      .map((response: Response) => response.json())
      .map((json: any) => <string>json['token'])
      .catch((error: any) => this._handleErrors(error));
  }

  public get(token: string): Observable<UserModel> {
    let url = [this._host, this._entityName].join('/'); // @todo: rest service refactoring
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'X-Auth-Token': token // @todo: move to base service
      })
    });

    return this._http.get(url, options)
      .map((response: Response) => response.json())
      .map((json: Object) => this.createEntity(json));
  }

  public list() {
    return Observable.throw('Method not allowed!');
  }

  public save() {
    return Observable.throw('Method not allowed!');
  }

  public delete() {
    return Observable.throw('Method not allowed!');
  }
}
