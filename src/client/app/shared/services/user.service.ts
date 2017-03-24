import { RestService } from './rest.service';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


export class UserService extends RestService<UserModel> {
  protected _entityName = 'users/-KfyPkVtZjcyZpIIzvon';
  protected _entityConstructor = UserModel;


  // public list(): Observable<UserModel[]> {
  //   return this._http.get(this._getRequestParams())
  //     .map((response: Response) => response.json())
  //     .map((json: Object[]) => json.map(x => new this._entityConstructor(x)));
  // }

}
