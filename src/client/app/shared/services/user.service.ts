import { RestService } from './rest.service';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


export class UserService extends RestService<UserModel> {
  protected _entityName = 'users';
  protected _entityConstructor = UserModel;

}
