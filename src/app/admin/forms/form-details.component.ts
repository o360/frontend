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
    (<AdminFormService> this._service).clone(model).subscribe(model => {
      this._router.navigate([this._returnPath, model.id, 'edit']);
      this._notificationService.success('T_SUCCESS_CLONED');
    });
  }
}
