import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

export class UserStatus {
  public static readonly New: string = 'new';
  public static readonly Approved: string = 'approved';
}
export class UserRole {
  public static readonly Admin: string = 'admin';
  public static readonly User: string = 'user';
}

@Defaults({
  name: '',
  email: '',
  status: '',
  role: ''
})
export class UserModel extends Model {
  public name: string;
  public email: string;
  public status: string;
  public role: string;
}
