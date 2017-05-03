import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  name: '',
  elements: []
})
export class FormModel extends Model {
  public name: string;
  public elements: IFormElement[];
}

export interface IFormElement {
  kind: string;
  caption: string;
  value?: string;
  required: boolean;
  values?: IFormElementValue[];
}

export interface IFormElementValue {
  value: string;
  caption: string;
}

export class FormElementType {
  public static readonly Radio: string = 'radio';
  public static readonly Textfield: string = 'textfield';
  public static readonly Textarea: string = 'textarea';
  public static readonly Checkbox: string = 'checkbox';
  public static readonly Checkboxgroup: string = 'checkboxgroup';
  public static readonly Select: string = 'select';
}
