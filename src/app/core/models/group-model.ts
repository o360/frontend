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
  hasChildren: false,
  level: '0'
})
export class GroupModel extends Model {
  public name: string;
  public parentId?: ModelId;
  public hasChildren: boolean;
  public level: string;
}
