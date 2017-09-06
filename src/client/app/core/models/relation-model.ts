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
  templates: [],
  canSelfVote: false
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
  public templates: IEmailTemplate[];
  public canSelfVote: boolean;

  constructor(json: any) {
    super(json);

    this.templates.forEach(item => {
      if (item.template) {
        item.templateId = item.template.id;
      }
    });

    if (this.project) {
      this.projectId = this.project.id;
    }

    if (this.groupFrom) {
      this.groupFromId = this.groupFrom.id;
    }

    if (this.groupTo) {
      this.groupToId = this.groupTo.id;
    }

    if (this.form) {
      this.formId = this.form.id;
    }
  }
}
