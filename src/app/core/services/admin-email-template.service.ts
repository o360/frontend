/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EmailTemplateModel } from '../models/email-template-model';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ConfirmationService } from './confirmation.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'templates',
  entityConstructor: EmailTemplateModel
})
export class AdminEmailTemplateService extends RestService<EmailTemplateModel> {
  constructor(http: HttpClient,
              authService: AuthService,
              router: Router,
              notificationService: NotificationService,
              confirmationService: ConfirmationService,
              configService: ConfigurationService) {
    super(http, authService, router, notificationService, confirmationService, configService);
  }

  public clone(model: EmailTemplateModel): Observable<EmailTemplateModel> {
    let clone = new EmailTemplateModel(model.toJson());

    clone.id = undefined;
    clone.name += ' (copy)';

    return this.save(clone);
  }
}
