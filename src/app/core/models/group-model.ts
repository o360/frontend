import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  hasChildren: false,
  level: '0'
})
export class GroupModel extends Model {
  public name: string;
  public parentId?: ModelId;
  public hasChildren: boolean;
  public level: string;
}
