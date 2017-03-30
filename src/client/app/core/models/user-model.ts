import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: ''
})
export class UserModel extends Model {
  public name: string;
}
