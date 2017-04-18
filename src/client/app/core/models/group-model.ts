import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: '',
})
export class GroupModel extends Model {
  public name: string;
}
