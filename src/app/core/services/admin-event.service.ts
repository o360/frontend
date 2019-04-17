import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EventModel } from '../models/event-model';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { ConfirmationService } from './confirmation.service';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'events',
  entityConstructor: EventModel
})
export class AdminEventService extends RestService<EventModel> {
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }

  public addProject(eventId?: ModelId, projectId?: ModelId): Observable<EventModel> {
    let requestParams = `${this._getRequestParams(eventId)}/projects/${projectId}`;
    let json = { 'eventId': eventId, 'projectId': projectId };
    let requestOptions = this._getRequestOptions();
    return this._http.post(requestParams, json, requestOptions)
      .pipe(
        map((jsonData: any) => this.createEntity(jsonData)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public removeProject(eventId?: ModelId, projectId?: ModelId): Observable<any> {
    let requestParams = `${this._getRequestParams(eventId)}/projects/${projectId}`;
    let requestOptions = this._getRequestOptions();
    return this._http.delete(requestParams, requestOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }

  public clone(model: EventModel): Observable<EventModel> {
    let requestParams = `${this._getRequestParams(model.id)}/clone`;
    let requestOptions = this._getRequestOptions();
    let clone = new EventModel(model.toJson());
    return this._http.post(requestParams, clone, requestOptions)
      .pipe(
        map((json: any) => this.createEntity(json)),
        catchError((error: HttpErrorResponse) => this._handleErrors(error))
      );
  }
}
