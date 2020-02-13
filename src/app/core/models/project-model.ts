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
import { EmailKind, Recipient } from './email-template-model';
import { GroupModel } from './group-model';
import { Model, ModelId } from './model';
import { NotSerializable } from '../decorators/not-serializable.decorator';

export interface IEmailTemplate {
  templateId?: ModelId;
  template?: {
    id: string;
    name: string;
  };
  kind: EmailKind;
  recipient: Recipient;
}

@Defaults({
  name: '',
  groupAuditorId: null,
  templates: [],
  canRevote: true,
  formsOnSamePage: false,
  hasInProgressEvents: false,
  isAnonymous: false,
  active: false,
  isLast: false
})
export class ProjectModel extends Model {
  public name: string;
  public machineName: string;
  public description: string;
  public groupAuditorId?: ModelId;
  public groupAuditor?: GroupModel;
  public templates: IEmailTemplate[];
  public canRevote: boolean;
  public formsOnSamePage: boolean;
  public hasInProgressEvents: boolean;
  public isAnonymous: boolean;
  @NotSerializable() public active?: boolean;
  @NotSerializable() public isLast?: boolean;

  constructor(json: any) {
    super(json);

    this.templates.forEach((item) => {
      if (item.template) {
        item.templateId = item.template.id;
      }
    });

    if (this.groupAuditor) {
      this.groupAuditorId = this.groupAuditor.id;
    }
  }
}
