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
import { NotSerializable } from '../decorators/not-serializable.decorator';

export class UserStatus {
  public static readonly New: string = 'new';
  public static readonly Approved: string = 'approved';
}

export class UserRole {
  public static readonly Admin: string = 'admin';
  public static readonly User: string = 'user';
}

export class UserGender {
  public static readonly Female: string = 'female';
  public static readonly Male: string = 'male';
}

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
export class UserModel extends Model {
  public firstName: string;
  public lastName: string;
  public email?: string;
  public status?: string;
  public role?: string;
  public gender: string;
  public timezone?: string;
  public termsApproved: boolean;
  public hasPicture?: boolean;
  @NotSerializable() public picture?: any;
  @NotSerializable() public groups?: string;

  @NotSerializable()
  public get name(): string {
    return `${this.lastName} ${this.firstName}`.trim();
  }

  @NotSerializable()
  public get isFilled(): boolean {
    return !!this.name && !!this.email && !!this.gender;
  }
}
