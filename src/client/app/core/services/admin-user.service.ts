import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';
import { ConfirmationService } from './confirmation.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

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
}
