import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'users',
  entityConstructor: UserModel
})
export class UserService extends RestService<UserModel> {
}
