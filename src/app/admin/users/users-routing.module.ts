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
import { RouterModule } from '@angular/router';
import { AdminUserDetailsComponent } from './user-details.component';
import { AdminUserListComponent } from './user-list.component';
import { AdminUserFormComponent } from './user-form.component';
import { AppRoutes } from '../../core/models/app-routes.model';
import { AdminUserInviteListComponent } from './user-invite-list.component';
import { AdminUserInviteFormComponent } from './user-invite-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminUserListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'invites',
      component: AdminUserInviteListComponent,
      breadcrumb: 'T_INVITES',
    }, {
      path: 'invites/send',
      component: AdminUserInviteFormComponent,
      breadcrumb: 'T_ACTION_INVITE',
    }, {
      path: ':id',
      component: AdminUserDetailsComponent,
      breadcrumb: 'T_USER_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminUserFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {
}
