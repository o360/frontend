import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';
import { ConfirmationService } from './confirmation.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../models/model';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'users',
  entityConstructor: UserModel
})
export class AdminUserService extends RestService<UserModel> {
  constructor(http: Http,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }

  public setPicture(id: ModelId, file: string): Observable<any> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = new RequestOptions({
      headers: new Headers({
        'X-Auth-Token': this._authService.token
      })
    });

    let formData = new FormData();
    formData.append('picture', this._convertDataUriToBlob(file), 'pic.jpg');

    return this._http.post(requestParams, formData, requestOptions)
      .map((res: Response) => res.json())
      .catch((error: Response) => this._handleErrors(error));
  }
}
