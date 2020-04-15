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

import { Model, ModelId } from './model';
import { UserModel } from './user-model';
import { NotSerializable } from '../decorators/not-serializable.decorator';

export class AssessmentModel extends Model {
  public user?: UserModel;
  public userId?: ModelId;
  public form?: IFormAnswer;
  public forms?: IFormAnswer[];
  public isClassic?: boolean;
  @NotSerializable() public isAnswered?: boolean;

  constructor(json?: Object) {
    super(json);

    if (!!this.user) {
      this.user = new UserModel(this.user);
    }
  }
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
