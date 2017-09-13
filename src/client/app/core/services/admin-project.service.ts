import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { ProjectModel } from '../models/project-model';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  endpoint: 'admin',
  entityName: 'projects',
  entityConstructor: ProjectModel
})
export class AdminProjectService extends RestService<ProjectModel> {
}


