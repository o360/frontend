import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { UserModel } from '../models/user-model';
import { FirebaseRestService } from './firebase-rest.service';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'users',
  entityConstructor: UserModel
})
export class UserService extends RestService<UserModel> {
}
