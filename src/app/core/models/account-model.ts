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
import { UserModel } from './user-model';
import { NotSerializable } from '../decorators/not-serializable.decorator';

@Defaults({
  firstName: '',
  lastName: '',
  email: '',
  status: '',
  role: '',
  gender: null,
  timezone: 'Z',
  termsApproved: false,
  hasPicture: false,
})
export class AccountModel extends UserModel {
  @NotSerializable() public status?: string;
  @NotSerializable() public role?: string;

  @NotSerializable()
  public get isFilled(): boolean {
    return !!this.name && !!this.gender && !!this.email && this.timezone !== 'Z';
  }
}
