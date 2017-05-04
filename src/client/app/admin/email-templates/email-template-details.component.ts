import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';

@Component({
  moduleId: module.id,
  selector: 'bs-template-details',
  templateUrl: `email-template-details.component.html`
})
export class EmailTemplateDetailsComponent extends DetailsComponent<EmailTemplateModel> {
  constructor(service: EmailTemplateService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

