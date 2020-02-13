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
import { NgModule } from '@angular/core';
import { AdminEmailTemplateFormComponent } from './email-template-form.component';
import { AdminEmailTemplateListComponent } from './email-template-list.component';
import { AdminEmailTemplatesRoutingModule } from './email-templates-routing.module';
import { AdminEmailTemplateDetailsComponent } from './email-template-details.component';

@NgModule({
  imports: [
    AdminEmailTemplatesRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminEmailTemplateListComponent,
    AdminEmailTemplateFormComponent,
    AdminEmailTemplateDetailsComponent
  ],
  exports: [
    AdminEmailTemplateListComponent,
    AdminEmailTemplateFormComponent,
    AdminEmailTemplateDetailsComponent
  ]
})
export class AdminEmailTemplatesModule {
}
