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
import { AdminEventListComponent } from './event-list.component';
import { AdminEventFormComponent } from './event-form.component';
import { AdminEventDetailsComponent } from './event-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';
import { AdminEventCloneFormComponent } from './event-clone-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminEventListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: AdminEventFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminEventDetailsComponent,
      breadcrumb: 'T_EVENT_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminEventFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }, {
      path: ':id/clone',
      component: AdminEventCloneFormComponent,
      breadcrumb: 'T_ACTION_CLONE',
    }])
  ],
  exports: [RouterModule]
})
export class AdminEventsRoutingModule {
}
