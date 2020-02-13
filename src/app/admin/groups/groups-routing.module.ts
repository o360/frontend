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
import { AdminGroupFormComponent } from './group-form.component';
import { AdminGroupListComponent } from './group-list.component';
import { AdminGroupDetailsComponent } from './group-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';
import { AdminGroupInviteFormComponent } from './group-invite-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminGroupListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'invite',
      component: AdminGroupInviteFormComponent,
      breadcrumb: 'T_ACTION_INVITE',
    }, {
      path: 'create',
      component: AdminGroupFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminGroupDetailsComponent,
      breadcrumb: 'T_GROUP_DETAILS',
    }, {
      path: ':id',
      component: AdminGroupDetailsComponent,
      breadcrumb: 'T_GROUP_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminGroupFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }, {
      path: ':id/invite',
      component: AdminGroupInviteFormComponent,
      breadcrumb: 'T_ACTION_INVITE',
    }])
  ],
  exports: [RouterModule]
})
export class AdminGroupsRoutingModule {
}
