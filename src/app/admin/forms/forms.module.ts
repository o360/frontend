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
import { SharedModule } from '../../shared/shared.module';
import { AdminFormsRoutingModule } from './forms-routing.module';
import { AdminFormListComponent } from './form-list.component';
import { AdminFormBuilderComponent } from './form-builder.component';
import { AdminFormDetailsComponent } from './form-details.component';
import { AdminFormBuilderElementComponent } from './form-element.component';

@NgModule({
  imports: [
    SharedModule,
    AdminFormsRoutingModule
  ],
  declarations: [
    AdminFormListComponent,
    AdminFormBuilderComponent,
    AdminFormDetailsComponent,
    AdminFormBuilderElementComponent
  ],
  exports: [
    AdminFormListComponent,
    AdminFormBuilderComponent,
    AdminFormDetailsComponent,
    AdminFormBuilderElementComponent
  ],
})
export class AdminFormsModule {
}
