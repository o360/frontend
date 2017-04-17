import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'users',
  entityConstructor: UserModel
})
export class UserService extends RestService<UserModel> {
}
