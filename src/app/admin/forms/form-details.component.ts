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
import { DetailsComponent } from '../../shared/components/details.component';
import { FormElementType, FormModel } from '../../core/models/form-model';
import { AdminFormService } from '../../core/services/admin-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-form-details',
  templateUrl: 'form-details.component.html'
})
export class AdminFormDetailsComponent extends DetailsComponent<FormModel> {

  public get FormElementType() {
    return FormElementType;
  }

  constructor(service: AdminFormService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/forms';
  }

  public clone(model: FormModel) {
    (<AdminFormService> this._service).clone(model).subscribe((model) => {
      this._router.navigate([this._returnPath, model.id, 'edit']);
      this._notificationService.success('T_SUCCESS_CLONED');
    });
  }
}
