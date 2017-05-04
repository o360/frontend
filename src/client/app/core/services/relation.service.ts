import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { RelationModel } from '../models/relation-model';

@Injectable()
@RestServiceConfig({
  entityName: 'relations',
  entityConstructor: RelationModel
})
export class RelationService extends RestService<RelationModel> {
}
