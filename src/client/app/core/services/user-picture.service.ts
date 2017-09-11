import { RequestOptions, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';

@RestServiceConfig({
  entityName: 'users',
  entityConstructor: AccountModel
})
export class UserPictureService extends RestService<AccountModel> {
  protected _picture: any;

  public get picture(): any {
    return this._picture;
  }

  public getPicture(id: ModelId): Observable<any> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = new RequestOptions({
      responseType: ResponseContentType.Blob,
      headers: new Headers({
        'X-Auth-Token': this._authService.token
      })
    });

    return this._http.get(requestParams, requestOptions)
      .map((response: Response) => response.blob());
  }
}
