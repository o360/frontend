import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config/env.config';
import { Model } from '../models/model';

export declare type ModelConstructor<T> = { new (json: Object): T };

@Injectable()
export class RestService<T extends Model> {
  protected _host: string = Config.API;
  protected _endpoint: string;
  protected _entityName: string;
  protected _entityConstructor: ModelConstructor<T>;

  constructor(protected _http: Http) {
  }

  /**
   * Get list of data from API
   * @return {Observable<T[]>}
   */
  public list(): Observable<T[]> {
    return this._http.get(this._getRequestParams())
      .map((response: Response) => {
        let values: T[] = [];

        for (let [key, value] of Object.entries(response.json())) {
          let item = new this._entityConstructor(value);

          item.id = key;

          values.push(item);
        }

        return values;
      })
      .map((json: Object[]) => json.map(x => new this._entityConstructor(x)))
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Get a record of data by ID from API
   * @params {number} id of record
   * @return {Observable<T>}
   */
  public get(id: number): Observable<T> {
    return this._http.get(this._getRequestParams(id))
      .map((response: Response) => response.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Save record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    } else {
      return this._create(model);
    }
  }

  /**
   * Delete record of data by ID
   * @params {number} id of record
   * @return {Observable<void>}
   */
  public delete(id: number): Observable<void> {
    let requestParams = this._getRequestParams(id);
    let requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Update record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _update(model: T): Observable<T> {
    let requestParams = this._getRequestParams(model.id);
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Create a new one record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _create(model: T): Observable<T> {
    let requestParams = this._getRequestParams();
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Get full path with request params
   * @params {number} id
   * @return {Observable<T>}
   */
  protected _getRequestParams(id?: number | string) {
    let path: string[] = [];

    path.push(this._host);
    path.push(this._endpoint);
    path.push(this._entityName);

    if (id !== undefined) {
      path.push(id.toString());
    }

    path = path.filter(part => part && part !== '');

    return path.join('/') + '.json';
  }

  protected _getRequestOptions() {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
      })
    });
  }

  protected _handleErrors(error: any) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

