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
    return this._createBulk(model, queryParams);
  }

  public save(model: AssessmentModel, queryParams?: IQueryParams): Observable<AssessmentModel> {
    if (model.id !== undefined) {
      return this._update(model, queryParams);
    } else {
      return this._create(model, queryParams);
    }
  }

  protected _update(model: AssessmentModel, queryParams?: IQueryParams): Observable<AssessmentModel> {
    let requestParams = this._getRequestParams(model.id, queryParams);
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  protected _create(model: AssessmentModel, queryParams?: IQueryParams): Observable<AssessmentModel> {
    let requestParams = this._getRequestParams(model.id, queryParams);
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  protected _createBulk(model: AssessmentModel[], queryParams?: IQueryParams): Observable<AssessmentModel> {
    let requestParams = this._getRequestParams('bulk', queryParams);
    let json = JSON.stringify(model);
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }
}

