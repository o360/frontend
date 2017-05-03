import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';
import { RelationModel } from './relation-model';

@Defaults({
  name: '',
  groupAuditorId: '',
  relations: []
})
export class ProjectModel extends Model {
  public name: string;
  public description?: string;
  public groupAuditorId: ModelId;
  public relations: RelationModel[];
}
