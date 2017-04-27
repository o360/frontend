import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { GroupModel } from '../models/group-model';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class GroupService extends RestService<GroupModel> {
}
