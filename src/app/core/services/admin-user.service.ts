import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';
import { ConfirmationService } from './confirmation.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ModelId } from '../models/model';
import { ConfigurationService } from './configuration.service';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'users',
  entityConstructor: UserModel
})
export class AdminUserService extends RestService<UserModel> {
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService,
              configService: ConfigurationService) {
    super(http, authService, router, notificationService, confirmationService, configService);
  }

  public setPicture(id: ModelId, file: string): Observable<any> {
    let requestParams = `${this._getRequestParams(id)}/picture`;
    let requestOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': this._authService.token
      })
    };

    let formData = new FormData();
    formData.append('picture', this._convertDataUriToBlob(file), 'pic.jpg');

    return this._http.post(requestParams, formData, requestOptions)
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }
}
