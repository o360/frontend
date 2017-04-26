import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { ProjectModel } from '../models/project-model';
import { RestService } from './rest.service';
import { Observable } from 'rxjs/Observable';
export declare type ModelConstructor<ProjectModel> = { new (json: Object): ProjectModel };

@Injectable()
@RestServiceConfig({
  entityName: 'projects',
  entityConstructor: ProjectModel
})
export class ProjectService extends RestService<ProjectModel> {
  // protected _entityConstructor: ModelConstructor<ProjectModel>;
  //
  // public relationRequest(model: ProjectModel): Observable<ProjectModel> {
  //   let requestParams = this._getRequestParams(model.id);
  //   let json = model.toJson();
  //   // let json = {
  //   //   "id": model.id,
  //   //   "name": model.name,
  //   //   "description": model.description,
  //   //   "groupAuditor": model.groupAuditor,
  //   //   "relations": model.relations
  //   // };
  //   let requestOptions = this._getRequestOptions();
  //   console.log(json);
  //   console.log(model);
  //
  //   return this._http.put(requestParams, json, requestOptions)
  //     .map((res: Response) => res.json())
  //     .map((json: any) => this.createRelationEntity(json))
  //     .catch((error: Response) => this._handleErrors(error));
  // }
  //
  // public createRelationEntity(json?: Object): ProjectModel {
  //   console.log(json);
  //   return new this._entityConstructor(json);
  // }
}
// public name: string;
// public description?: string;
// public groupAuditor: ModelId;
// public relations: [
//   {
//     groupFrom: ModelId;
// groupTo: ModelId,
//   form: ModelId,
//   kind: string
// }];
// }
