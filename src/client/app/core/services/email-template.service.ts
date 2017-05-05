import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EmailTemplateModel } from '../models/email-template-model';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
@RestServiceConfig({
  entityName: 'templates',
  entityConstructor: EmailTemplateModel
})
export class EmailTemplateService extends RestService<EmailTemplateModel> {
  constructor(http: Http,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService) {
    super(http, authService, router, notificationService);
  }

  public clone(model: EmailTemplateModel): Observable<EmailTemplateModel> {
    let clone = new EmailTemplateModel(JSON.parse(model.toJson()));

    clone.id = undefined;
    clone.name += ' (copy)';

    return this.save(clone);
  }
}
