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
import { AdminEmailTemplateListComponent } from './email-template-list.component';
import { AdminEmailTemplateFormComponent } from './email-template-form.component';
import { AdminEmailTemplateDetailsComponent } from './email-template-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminEmailTemplateListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: AdminEmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminEmailTemplateDetailsComponent,
      breadcrumb: 'T_EMAIL_TEMPLATE_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminEmailTemplateFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminEmailTemplatesRoutingModule {
}
