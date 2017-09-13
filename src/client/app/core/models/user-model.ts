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
export class UserGender {
  public static readonly Female: string = 'female';
  public static readonly Male: string = 'male';
}

@Defaults({
  name: '',
  email: '',
  status: '',
  role: '',
  gender: null,
  timezone: 'Z',
  termsApproved: false
})
export class UserModel extends Model {
  public name: string;
  public email?: string;
  public status?: string;
  public role?: string;
  public gender: string;
  public timezone?: string;
  public termsApproved: boolean;
}
