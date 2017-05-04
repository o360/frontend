import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

export class RelationKind {
  public static readonly Classic: string = 'classic';
  public static readonly Survey: string = 'survey';
}

export interface IModelIdName {
  id: ModelId;
  name: string;
}
export interface IProjectRelation {
  project?: IModelIdName;
  projectId?: ModelId;
  groupFrom?: IModelIdName;
  groupFromId?: ModelId;
  groupTo?: IModelIdName;
  groupToId?: ModelId;
  form?: IModelIdName;
  formId?: ModelId;
  kind: string;
}

@Defaults({
  projectId: '',
  groupFromId: '',
  formId: '',
  kind: RelationKind.Classic
})
export class RelationModel extends Model {
  public project?: IModelIdName;
  public projectId?: ModelId;
  public groupFrom?: IModelIdName;
  public groupFromId?: ModelId;
  public groupTo?: IModelIdName;
  public groupToId?: ModelId;
  public form?: IModelIdName;
  public formId?: ModelId;
  public kind: string;
}
