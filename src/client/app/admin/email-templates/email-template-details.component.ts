import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-template-details',
  templateUrl: `email-template-details.component.html`
})
export class EmailTemplateDetailsComponent extends DetailsComponent<EmailTemplateModel> {
  protected _returnPath = ['/admin/templates'];

  constructor(service: EmailTemplateService,
              route: ActivatedRoute,
              protected _router: Router,
              protected _notificationService: NotificationService) {
    super(service, route);
  }

  public clone(model: EmailTemplateModel) {
    (<EmailTemplateService>this._service).clone(model).subscribe(() => {
      if (this._returnPath) {
        this._router.navigate(this._returnPath);
      }
      this._notificationService.success('T_SUCCESS_CLONED');
    });
  }
}

