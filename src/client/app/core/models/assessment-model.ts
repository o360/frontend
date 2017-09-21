import { Model, ModelId } from './model';
import { UserModel } from './user-model';
import { NotSerializable } from '../decorators/not-serializable.decorator';

@NotSerializable({ isAnswered: true })
export class AssessmentModel extends Model {
  public user?: UserModel;
  public userId?: ModelId;
  public form?: IFormAnswer;
  public forms?: IFormAnswer[];
  public isClassic?: boolean;
  public isAnswered?: boolean;
}

export interface IFormAnswer {
  form?: IForm;
  formId?: ModelId;
  userId?: ModelId;
  answers: IElementAnswer[];
  isAnonymous: boolean;
  isSkipped: boolean;
  status?: string;
  isLast?: boolean;
  active?: boolean;
}

export interface IForm {
  id: ModelId;
  name: string;
}

export interface IElementAnswer {
  elementId: ModelId;
  text?: string;
  valuesIds?: ModelId[];
  comment?: string;
}

export class AssessmentFormStatus {
  public static readonly New: string = 'new';
  public static readonly Answered: string = 'answered';
  public static readonly Skipped: string = 'skipped';
}
