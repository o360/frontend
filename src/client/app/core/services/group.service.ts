import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { GroupModel } from '../models/group-model';

@Injectable()
@RestServiceConfig({
  entityName: 'groups',
  entityConstructor: GroupModel
})
export class GroupService extends RestService<GroupModel> {
}
