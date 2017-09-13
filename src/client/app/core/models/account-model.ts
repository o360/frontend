import { Defaults } from '../decorators/defaults.decorator';
import { UserModel } from './user-model';

@Defaults({
  name: '',
  email: '',
  status: '',
  role: '',
  gender: null,
  timezone: 'Z',
  termsApproved: false
})
export class AccountModel extends UserModel {
  public get isFilled(): boolean {
    return !!this.name && !!this.gender && !!this.email && this.timezone !== 'Z';
  }
}
