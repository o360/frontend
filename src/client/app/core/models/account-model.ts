import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: '',
  email: '',
  status: '',
  role: '',
  gender: '',
  timezone: 'Z'
})
export class AccountModel extends Model {
  public name: string;
  public email: string;
  public status: string;
  public role: string;
  public gender: string;
  public timezone: string;
}
