import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EmailTemplateModel } from '../models/email-template-model';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ConfirmationService } from './confirmation.service';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'templates',
  entityConstructor: EmailTemplateModel
})
export class AdminEmailTemplateService extends RestService<EmailTemplateModel> {
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }

  public clone(model: EmailTemplateModel): Observable<EmailTemplateModel> {
    let clone = new EmailTemplateModel(model.toJson());

    clone.id = undefined;
    clone.name += ' (copy)';

    return this.save(clone);
  }
}
