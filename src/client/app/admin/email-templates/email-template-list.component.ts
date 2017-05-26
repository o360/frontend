import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-template-list',
  templateUrl: 'email-template-list.component.html'
})
export class EmailTemplateListComponent extends ListComponent<EmailTemplateModel> {
  constructor(service: EmailTemplateService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public clone(model: EmailTemplateModel) {
    (<EmailTemplateService>this._service).clone(model).subscribe(model => {
      this._router.navigate(['/admin/templates', model.id, 'edit']);
      this._notificationService.success('T_SUCCESS_CLONED');
    });
  }
}
