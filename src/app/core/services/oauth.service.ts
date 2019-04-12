import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';

@RestServiceConfig({
  entityName: 'auth',
  entityConstructor: AccountModel
})
export class OAuthService extends RestService<AccountModel> {
  public authenticate(provider: string, code: string): Observable<string> {
    let body = JSON.stringify({ 'code': code });
    let params = `${this._getRequestParams()}/${provider}`;
    let options = this._getRequestOptions();

    return this._http.post(params, body, options)
      .pipe(
        map((json: any) => <string> json['token']),
        catchError((error: Response) => this._handleErrors(error))
      );
  }

  public list() {
    return observableThrowError('Method not allowed!');
  }

  public delete() {
    return observableThrowError('Method not allowed!');
  }
}
