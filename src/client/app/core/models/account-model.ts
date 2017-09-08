import { Defaults } from '../decorators/defaults.decorator';
import { UserModel } from './user-model';

@Defaults({
  name: '',
  email: '',
  status: '',
  role: '',
  gender: null,
  timezone: 'Z'
})
export class AccountModel extends UserModel {
  public name: string;
  public email?: string;
  public status?: string;
  public role?: string;
  public gender: string;
  public timezone?: string;

  public get isFilled(): boolean {
    return !!this.name && !!this.gender && !!this.email && this.timezone !== 'Z';
  }
}
