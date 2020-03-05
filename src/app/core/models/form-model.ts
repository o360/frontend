/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Defaults } from '../decorators/defaults.decorator';
import { Model, ModelId } from './model';

@Defaults({
  name: '',
  elements: [],
  showInAggregation: true
})
export class FormModel extends Model {
  public name: string;
  public machineName: string;
  public elements: FormElement[];
  public showInAggregation: boolean;
}

export class FormElement extends Model {
  public kind: string;
  public caption: string;
  public required: boolean;
  public hint?: string;
  public values?: IFormElementValue[];
  public tempValue?: any;
  public tempComment?: string;
}

export interface IFormElementValue {
  id?: ModelId;
  caption: string;
  hint?: string;
  tempValue?: any;
}

export class FormElementType {
  public static readonly Radio: string = 'radio';
  public static readonly Textfield: string = 'textfield';
  public static readonly Textarea: string = 'textarea';
  public static readonly Checkbox: string = 'checkbox';
  public static readonly Checkboxgroup: string = 'checkboxgroup';
  public static readonly Select: string = 'select';
  public static readonly LikeDislike: string = 'likedislike';
}
