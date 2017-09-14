import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { EmailTemplateModel } from '../../core/models/email-template-model';
import { AdminEmailTemplateService } from '../../core/services/admin-email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-template-details',
  templateUrl: `email-template-details.component.html`
})
export class AdminEmailTemplateDetailsComponent extends DetailsComponent<EmailTemplateModel> {
  constructor(service: AdminEmailTemplateService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/templates';
  }

  public clone(model: EmailTemplateModel) {
    (<AdminEmailTemplateService>this._service).clone(model).subscribe(model => {
      this._router.navigate([this._returnPath, model.id, 'edit']);
      this._notificationService.success('T_SUCCESS_CLONED');
    });
  }
}

