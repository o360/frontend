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
import { Model } from './model';

export class EmailKind {
  public static readonly preBegin: string = 'preBegin';
  public static readonly begin: string = 'begin';
  public static readonly preEnd: string = 'preEnd';
  public static readonly end: string = 'end';
}

export class Recipient {
  public static readonly respondent: string = 'respondent';
  public static readonly auditor: string = 'auditor';
}

@Defaults({
  name: '',
  subject: '',
  body: '',
  kind: EmailKind.preBegin,
  recipient: Recipient.respondent
})
export class EmailTemplateModel extends Model {
  public name: string;
  public subject: string;
  public body: string;
  public kind: string;
  public recipient: string;
}
