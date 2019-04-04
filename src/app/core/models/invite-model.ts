import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

export interface IGroupsModel {
  id: ModelId;
  name: string;
}
@Defaults({
  email: '',
  groups: [],
})
export class InviteModel extends Model {
  public code?: string;
  public email: string;
  public groups: IGroupsModel[];
  public creationTime?: string;
  public activationTime?: string;
}

