import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  groupAuditorId: '',
  relations: []
})
export class ProjectModel extends Model {
  public name: string;
  public description?: string;
  public groupAuditor: ModelId;
  public relations: [
    {
      groupFrom: ModelId;
      groupTo: ModelId,
      form: ModelId
    }];
}
