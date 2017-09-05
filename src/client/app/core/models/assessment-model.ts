import { Model, ModelId } from './model';
import { UserModel } from './user-model';

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
}

export interface IForm {
  id: ModelId;
  name: string;
}

export interface IElementAnswer {
  elementId: ModelId;
  text?: string;
  valuesIds?: ModelId[];
}
