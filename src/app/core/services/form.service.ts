import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { FormModel } from '../models/form-model';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';
import { ConfirmationService } from './confirmation.service';

@Injectable()
@RestServiceConfig({
  entityName: 'forms',
  entityConstructor: FormModel
})
export class FormService extends RestService<FormModel> {

  constructor(http: Http,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }

  public clone(model: FormModel): Observable<FormModel> {
    let clone = new FormModel(model.toJson());

    clone.id = undefined;
    clone.name += ' (copy)';

    return this.save(clone);
  }
}
