import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';
import { GroupModel } from './group-model';
import { EmailKind, Recipient } from './email-template-model';

export interface IEmailTemplate {
  template: {
    id: string;
    name: string;
  };
  kind: EmailKind;
  recipient: Recipient;
}

@Defaults({
  name: '',
  groupAuditorId: null,
  templates: []
})
export class ProjectModel extends Model {
  public name: string;
  public description: string;
  public groupAuditorId?: ModelId;
  public groupAuditor?: GroupModel;
  public templates: IEmailTemplate;
}
