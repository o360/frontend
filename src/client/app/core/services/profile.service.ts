import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { AccountModel } from '../models/account-model';
import { RestService } from './rest.service';
import { Config } from '../../shared/config/env.config';

@RestServiceConfig({
  entityName: 'users',
  entityConstructor: AccountModel
})
export class ProfileService extends RestService<AccountModel> {
}
