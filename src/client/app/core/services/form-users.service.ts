import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { FormModel } from '../models/form-model';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { IListResponse, IQueryParams, RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'forms/user',
  entityConstructor: FormModel
})
export class FormUsersService extends RestService<FormModel> {

  constructor(http: Http, authService: AuthService, router: Router, notificationService: NotificationService) {
    super(http, authService, router, notificationService);
  }

  public clone(model: FormModel): Observable<FormModel> {
    let clone = new FormModel(JSON.parse(model.toJson()));

    clone.id = undefined;
    clone.name += ' (copy)';

    return this.save(clone);
  }
}
