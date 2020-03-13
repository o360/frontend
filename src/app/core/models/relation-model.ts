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
  canSelfVote: false,
  canSkip: false
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
  public canSelfVote: boolean;
  public canSkip: boolean;
  public templates: IEmailTemplate[];
  public hasInProgressEvents: boolean;

  constructor(json: any) {
    super(json);

    this.templates.forEach((item) => {
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
