import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EventModel } from '../models/event-model';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable()
@RestServiceConfig({
  entityName: 'events',
  entityConstructor: EventModel
})
export class EventService extends RestService<EventModel> {

  constructor(http: Http, authService: AuthService, router: Router, notificationService: NotificationService) {
    super(http, authService, router, notificationService);
  }

  public addProject(eventId?: ModelId, projectId?: ModelId): Observable<void> {
    let requestParams = `${this._getRequestParams(eventId)}/projects/${projectId}`;
    let json = { 'eventId': eventId, 'projectId': projectId };
    let requestOptions = this._getRequestOptions();
    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  public removeProject(eventId?: ModelId, projectId?: ModelId): Observable<void> {
    let requestParams = `${this._getRequestParams(eventId)}/projects/${projectId}`;
    let requestOptions = this._getRequestOptions();
    return this._http.delete(requestParams, requestOptions)
      .catch((error: Response) => this._handleErrors(error));
  }
}
