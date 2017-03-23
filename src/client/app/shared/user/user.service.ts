import { RestService } from '../services/rest.service';
import { UserModel } from './user-model';

export class UserService extends RestService<UserModel> {
  protected _entityName = 'users';
  protected _entityConstructor = UserModel;
}
