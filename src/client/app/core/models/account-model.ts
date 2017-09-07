import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: '',
  email: '',
  status: '',
  role: '',
  gender: null,
  timezone: 'Z'
})
export class AccountModel extends Model {
  public name: string;
  public email: string;
  public status: string;
  public role: string;
  public gender: string;
  public timezone?: string;

  public get isFilled(): boolean {
    return !!this.name && !!this.gender && !!this.email && this.timezone !== 'Z';
  }
}
