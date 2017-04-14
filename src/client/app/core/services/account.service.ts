import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';

@RestServiceConfig({
  entityName: 'auth',
  entityConstructor: UserModel
})
export class AccountService extends RestService<UserModel> {

  public authenticate(provider: string, code: string): Observable<string> {
    let body = JSON.stringify({ 'code': code });
    let params = `${this._getRequestParams()}/${provider}`;
    let options = this._getRequestOptions();

    return this._http.post(params, body, options)
      .map((response: Response) => response.json())
      .map((json: any) => <string>json['token'])
      .catch((error: any) => this._handleErrors(error));
  }

  public get(token: string): Observable<UserModel> {
    let params = this._getRequestParams();
    let options = this._getRequestOptions();

    return this._http.get(params, options)
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
