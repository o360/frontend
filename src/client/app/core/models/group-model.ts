import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  hasChildren: false
})
export class GroupModel extends Model {
  public name: string;
  public parentId?: ModelId;
  public hasChildren: boolean;
}
