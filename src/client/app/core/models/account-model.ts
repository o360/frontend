import { Defaults } from '../decorators/defaults.decorator';
import { UserModel } from './user-model';
import { NotSerializable } from '../decorators/not-serializable.decorator';

@Defaults({
  name: '',
  email: '',
  gender: null,
  timezone: 'Z',
  termsApproved: false
})
export class AccountModel extends UserModel {
  @NotSerializable() public status?: string;
  @NotSerializable() public role?: string;

  @NotSerializable()
  public get isFilled(): boolean {
    return !!this.name && !!this.gender && !!this.email && this.timezone !== 'Z';
  }
}
