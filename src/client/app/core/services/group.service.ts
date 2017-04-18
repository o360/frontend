import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { GroupModel } from '../models/group-model';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';
@Injectable()
@RestServiceConfig({
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class GroupService extends RestService<GroupModel> {
  constructor(http: Http, authService: AuthService) {
    super(http, authService);
  }
}
