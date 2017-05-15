import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { ProjectModel } from '../models/project-model';
import { RestService } from './rest.service';
import { ModelId } from '../models/model';

@Injectable()
@RestServiceConfig({
  entityName: 'projects',
  entityConstructor: ProjectModel
})
export class ProjectService extends RestService<ProjectModel> {
  public addTemplate(model: any, template: any) {
    console.log('GOOOOOOOOOOOOOOO');
    console.log(model);
    console.log(template);
    let requestParams = this._getRequestParams(model.id);
    let json = {
      'id': model.id,
      'name': model.name,
      'description': model.description,
      'groupAuditorId': model.groupAuditor.id,
      'templates': [],
    };

    let temp = {
      'templateId': template.id,
      'kind': template.kind,
      'recipient': template.recipient
    };
    console.log(model);
    console.log(template);
    if (model.templates.length > 0) {
      let i: number = 0;
      while (i < model.templates.length) {
        let currentTemplates = {
          'templateId': model.templates[i].template.id,
          'kind': model.templates[i].kind,
          'recipient': model.templates[i].recipient
        };
        json.templates.push(currentTemplates);
        i++;
      }
      json.templates.push(temp);
    } else {
      json.templates.push(temp);
    }
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  public removeEmailTemplate(model: any, templateId: ModelId) {
    let requestParams = this._getRequestParams(model.id);
    let requestOptions = this._getRequestOptions();
    let json = {
      'id': model.id,
      'name': model.name,
      'description': model.description,
      'groupAuditorId': model.groupAuditor.id,
      'templates': [],
    };

    let index = model.templates.findIndex(x => x.template.id === templateId);
    model.templates.splice(index, 1);

    if (model.templates.length > 0) {
      let i: number = 0;
      while (i < model.templates.length) {
        let currentTemplates = {
          'templateId': model.templates[i].template.id,
          'kind': model.templates[i].kind,
          'recipient': model.templates[i].recipient
        };
        json.templates.push(currentTemplates);
        i++;
      }
    }
    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }
}


