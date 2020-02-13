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
import { AppRoutes } from '../core/models/app-routes.model';
import { UserListComponent } from './user-list.component';
import { UserPublicProfileComponent } from './user-public-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes> [{
      path: '',
      component: UserListComponent,
      breadcrumbIgnore: true,
    }, {
      path: ':id',
      component: UserPublicProfileComponent,
      breadcrumb: 'T_USER_DETAILS',
    }])
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
