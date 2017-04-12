import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: '',
  email: '',
  role: '',
  status: ''
})
export class AccountModel extends Model {
  public name: string;
  public email: string;
  public role: string;
  public status: string;
}
