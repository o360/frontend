import { Injectable, Input } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { GroupModel } from '../models/group-model';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { ModelId } from '../models/model';
import { IQueryParams } from '../../shared/interfaces/query-params.interface';

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
