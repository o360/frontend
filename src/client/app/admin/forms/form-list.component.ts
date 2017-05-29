import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { NotificationService } from '../../core/services/notification.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class FormListComponent extends ListComponent<FormModel> {

  constructor(service: FormService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public clone(model: FormModel) {
    this._service.get(model.id).subscribe((model: FormModel) => {
      (<FormService>this._service).clone(model).subscribe(model => {
        this._router.navigate(['/admin/forms', model.id, 'edit']);
        this._notificationService.success('T_SUCCESS_CLONED');
      });
    });
  }
}
