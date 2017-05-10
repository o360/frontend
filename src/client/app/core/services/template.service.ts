import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { TemplateModel } from '../models/template-model';

@Injectable()
@RestServiceConfig({
  entityName: 'templates',
  entityConstructor: TemplateModel
})
export class TemplateService extends RestService<TemplateModel> {
}
