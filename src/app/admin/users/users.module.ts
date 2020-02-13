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

import { SharedModule } from '../../shared/shared.module';
import { AdminUsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { AdminUserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { AdminUserFormComponent } from './user-form.component';
import { AdminUserGroupListComponent } from './user-group-list.component';
import { AdminUserInviteFormComponent } from './user-invite-form.component';
import { AdminUserInviteListComponent } from './user-invite-list.component';
import { AdminUserConfirmationComponent } from './user-confirmation.component';

@NgModule({
  imports: [
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminUserGroupListComponent,
    AdminUserInviteListComponent,
    AdminUserInviteFormComponent,
    AdminUserConfirmationComponent
  ],
  exports: [
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminUserGroupListComponent,
    AdminUserInviteListComponent,
    AdminUserInviteFormComponent,
    AdminUserConfirmationComponent
  ]
})
export class AdminUsersModule {
}
