import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: ''
})
export class GroupModel extends Model {
  public name: string;
  public parentId?: ModelId;
}
