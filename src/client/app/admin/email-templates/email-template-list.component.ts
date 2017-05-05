import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';

@Component({
  moduleId: module.id,
  selector: 'bs-template-list',
  templateUrl: 'email-template-list.component.html'
})
export class EmailTemplateListComponent extends ListComponent<EmailTemplateModel> {
  constructor(service: EmailTemplateService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(service, activatedRoute, router);
  }

  public clone(model: EmailTemplateModel) {
    (<EmailTemplateService>this._service).clone(model).subscribe(() => {
      this._update();
    });
  }
}
