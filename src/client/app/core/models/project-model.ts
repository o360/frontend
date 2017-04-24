import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  groupAuditorId: ''
})
export class ProjectModel extends Model {
  public name: string;
  public description?: string;
  // public relations:[];
  public groupAuditorId: ModelId;
}
