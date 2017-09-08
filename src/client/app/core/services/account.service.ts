import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';

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
}
