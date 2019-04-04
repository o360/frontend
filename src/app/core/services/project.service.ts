import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { ProjectModel } from '../models/project-model';
import { RestService } from './rest.service';

@Injectable()
@RestServiceConfig({
  entityName: 'projects',
  entityConstructor: ProjectModel
})
export class ProjectService extends RestService<ProjectModel> {
}


