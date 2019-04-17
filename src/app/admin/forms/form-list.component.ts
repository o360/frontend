import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModel } from '../../core/models/form-model';
import { AdminFormService } from '../../core/services/admin-form.service';
import { NotificationService } from '../../core/services/notification.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class AdminFormListComponent extends ListComponent<FormModel> {
  constructor(service: AdminFormService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }
}
