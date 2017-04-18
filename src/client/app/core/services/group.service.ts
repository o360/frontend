import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { GroupModel } from '../models/group-model';
import { RestService } from './rest.service';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
@RestServiceConfig({
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class GroupService extends RestService<GroupModel> {
  constructor(http: Http, authService: AuthService, router: Router) {
    super(http, authService, router);
  }
}
