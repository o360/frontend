import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../shared/config/env.config';
import { Model, ModelId } from '../models/model';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';

@Injectable()
export class FirebaseRestService<T extends Model> extends RestService<T> {
  protected _host: string = Config.FIREBASE_URL;

  /* @todo: Research: nested constructors works in angular 2.4.* */
  constructor(http: Http, authService: AuthService, router: Router) {
    super(http, authService, router);
  }

  public list(): Observable<T[]> {
    return this._http.get(this._getRequestParams(), this._getRequestOptions())
      .map((response: Response) => {
        let values: T[] = [];
        for (let [key, value] of Object.entries(response.json())) {
          let item = this.createEntity(value);
          item.id = key;
          values.push(item);
        }
        return values;
      }).catch((error: any) => this._handleErrors(error));
  }

  public get(id: ModelId): Observable<T> {
    return this._http.get(this._getRequestParams(id), this._getRequestOptions())
      .map((response: Response) => response.json())
      .map((json: any) => this.createEntity(Object.assign(json, { id: id })))
      .catch((error: any) => this._handleErrors(error));
  }

  protected _getRequestParams(id?: ModelId) {
    return super._getRequestParams(id) + '.json';
  }
}
