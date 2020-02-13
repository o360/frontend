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

import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { AdminGroupListComponent } from './group-list.component';
import { AdminGroupsRoutingModule } from './groups-routing.module';
import { AdminGroupDetailsComponent } from './group-details.component';
import { AdminGroupFormComponent } from './group-form.component';
import { AdminGroupUserListComponent } from './group-user-list.component';
import { AdminUsersAddModalComponent } from './users-add-modal.component';
import { AdminChildGroupListComponent } from './child-group-list.component';
import { AdminGroupProjectListComponent } from './group-project-list.component';
import { AdminGroupInviteFormComponent } from './group-invite-form.component';

@NgModule({
  imports: [
    SharedModule,
    AdminGroupsRoutingModule,
    BsDropdownModule
  ],
  declarations: [
    AdminGroupListComponent,
    AdminGroupDetailsComponent,
    AdminGroupFormComponent,
    AdminGroupUserListComponent,
    AdminUsersAddModalComponent,
    AdminChildGroupListComponent,
    AdminGroupProjectListComponent,
    AdminGroupInviteFormComponent
  ],
  exports: [
    AdminGroupListComponent,
    AdminGroupDetailsComponent,
    AdminGroupFormComponent,
    AdminGroupUserListComponent,
    AdminUsersAddModalComponent,
    AdminChildGroupListComponent,
    AdminGroupProjectListComponent,
    AdminGroupInviteFormComponent
  ],
})
export class AdminGroupsModule {
}
