import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EventModel } from '../models/event-model';
import { ModelId } from '../models/model';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { ConfirmationService } from './confirmation.service';

@Injectable()
@RestServiceConfig({
  entityName: 'events',
  entityConstructor: EventModel
})
export class EventUsersService extends RestService<EventModel> {
  constructor(http: Http,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService) {
    super(http, authService, router, notificationService, confirmationService);
  }
}
