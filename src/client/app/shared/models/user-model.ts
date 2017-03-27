import { Model } from './model';
import { Defaults } from '../decorators/defaults.decorator';

@Defaults({
  name: ''
})
export class UserModel extends Model {
  public name: string;
}
