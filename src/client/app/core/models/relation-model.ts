import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';
import { IEmailTemplate } from './project-model';

export class RelationKind {
  public static readonly Classic: string = 'classic';
  public static readonly Survey: string = 'survey';
}

export interface IModelIdName {
  id: ModelId;
  name: string;
}

@Defaults({
  projectId: '',
  groupFromId: '',
  formId: '',
  kind: RelationKind.Classic,
  templates: []
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
  public templates: IEmailTemplate;
}
