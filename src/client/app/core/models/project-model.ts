import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

export class RelationKind {
  public static readonly Classic: string = 'classic';
  public static readonly Survey: string = 'survey';
}

export interface IProjectRelation {
  groupFrom: ModelId;
  groupTo: ModelId;
  form: ModelId;
  kind: string;
}

@Defaults({
  name: '',
  groupAuditorId: '',
  relations: []
})
export class ProjectModel extends Model {
  public name: string;
  public description?: string;
  public groupAuditor: ModelId;
  public relations: IProjectRelation;
}
