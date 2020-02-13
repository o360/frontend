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
import { AdminUsersModule } from './users/users.module';
import { AdminGroupsModule } from './groups/groups.module';
import { AdminEventsModule } from './events/events.module';
import { AdminFormsModule } from './forms/forms.module';
import { AdminProjectsModule } from './projects/projects.module';
import { AdminEmailTemplatesModule } from './email-templates/email-templates.module';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      redirectTo: '/admin/users',
      pathMatch: 'full'
    }, {
      path: 'users',
      loadChildren: () => AdminUsersModule,
      breadcrumb: 'T_USERS'
    }, {
      path: 'groups',
      loadChildren: () => AdminGroupsModule,
      breadcrumb: 'T_GROUPS'
    }, {
      path: 'forms',
      loadChildren: () => AdminFormsModule,
      breadcrumb: 'T_FORMS'
    }, {
      path: 'projects',
      loadChildren: () => AdminProjectsModule,
      breadcrumb: 'T_PROJECTS'
    }, {
      path: 'templates',
      loadChildren: () => AdminEmailTemplatesModule,
      breadcrumb: 'T_EMAIL_TEMPLATES'
    }, {
      path: 'events',
      loadChildren: () => AdminEventsModule,
      breadcrumb: 'T_EVENTS'
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
