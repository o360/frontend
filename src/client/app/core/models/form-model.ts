import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  elements: []
})
export class FormModel extends Model {
  public name: string;
  public elements: FormElement[];
}

export class FormElement extends Model {
  kind: string;
  caption: string;
  required: boolean;
  values?: IFormElementValue[];
  tempValue?: any;
}

export interface IFormElementValue {
  id?: ModelId;
  caption: string;
  tempValue? : any;
}

export class FormElementType {
  public static readonly Radio: string = 'radio';
  public static readonly Textfield: string = 'textfield';
  public static readonly Textarea: string = 'textarea';
  public static readonly Checkbox: string = 'checkbox';
  public static readonly Checkboxgroup: string = 'checkboxgroup';
  public static readonly Select: string = 'select';
}
