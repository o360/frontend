import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

export class RelationKind {
  public static readonly Classic: string = 'classic';
  public static readonly Survey: string = 'survey';
}

export interface IProjectRelation {
  projectId: ModelId;
  groupFromId: ModelId;
  groupToId: ModelId;
  formId: ModelId;
  kind: string;
}

@Defaults({
  projectId: '',
  groupFromId: '',
  groupToId: '',
  formId: '',
  kind: 'classic'
})
export class RelationModel extends Model {
  public projectId: ModelId;
  public groupFromId: ModelId;
  public groupToId: ModelId;
  public formId: ModelId;
  public kind: string;
}
