import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';
import { GroupModel } from './group-model';

@Defaults({
  name: '',
  groupAuditorId: null,
  relations: []
})
export class ProjectModel extends Model {
  public name: string;
  public description: string;
  public groupAuditorId?: ModelId;
  public groupAuditor?: GroupModel;
}
