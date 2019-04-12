import { HttpHeaders } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';

@RestServiceConfig({
  entityName: 'users',
  entityConstructor: AccountModel
})
export class UserPictureService extends RestService<AccountModel> {
  public getPicture(id: ModelId): Observable<any> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'X-Auth-Token': this._authService.token
      })
    };

    return this._http.get(requestParams, requestOptions)
      .pipe(
        map((response: any) => response),
        mergeMap((image: Blob) => this._createImageFromBlob(image))
      );
  }

  protected _createImageFromBlob(image: Blob) {
    let obs = new Observable((observer) => {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        observer.next(reader.result);
        observer.complete();
      }, false);

      reader.addEventListener('error', () => {
        observer.error();
      }, false);

      reader.readAsDataURL(image);
    });

    return obs;
  }
}
