import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { IQueryParams, RestService } from './rest.service';
import { AssessmentModel } from '../models/assessment-model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
@RestServiceConfig({
  entityName: 'assessments',
  entityConstructor: AssessmentModel
})
export class AssessmentService extends RestService<AssessmentModel> {
  public saveBulk(model: AssessmentModel[], queryParams?: IQueryParams): Observable<AssessmentModel> {
    let requestParams = this._getRequestParams(undefined, queryParams);
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }
}

