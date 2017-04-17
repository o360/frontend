import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';

@RestServiceConfig({
  entityName: 'users',
  entityConstructor: AccountModel
})
export class ProfileService extends RestService<AccountModel> {
}
