import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { FormModel } from '../models/form-model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable()
@RestServiceConfig({
  entityName: 'forms',
  entityConstructor: FormModel
})
export class FormService extends RestService<FormModel> {

  constructor(http: Http, authService: AuthService, router: Router, notificationService: NotificationService) {
    super(http, authService, router, notificationService);
  }

  public clone(model: FormModel): Observable<FormModel> {
    let requestParams = this._getRequestParams(model.id) + '/clone';
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

}
