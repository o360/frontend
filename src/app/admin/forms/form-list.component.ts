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

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModel } from '../../core/models/form-model';
import { AdminFormService } from '../../core/services/admin-form.service';
import { NotificationService } from '../../core/services/notification.service';
import { ListComponentDirective } from '../../shared/components/list-component.directive';

@Component({
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class AdminFormListComponent extends ListComponentDirective<FormModel> {
  constructor(service: AdminFormService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }
}
