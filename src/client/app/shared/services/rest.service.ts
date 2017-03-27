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

  public list(): Observable<T[]> {
    return this._http.get(this._getRequestParams())
      .map((response: Response) => Object.values(response.json()))
      .map((json: Object[]) => json.map(x => new this._entityConstructor(x)))
      .catch((error: any) => this._handleErrors(error));
  }

  public get(id: number): Observable<T> {
    return this._http.get(this._getRequestParams(id))
      .map((response: Response) => response.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    } else {
      return this._create(model);
    }
  }

  public delete(id: number): Observable<void> {
    let requestParams = this._getRequestParams(id);
    let requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: any) => this._handleErrors(error));
  }

  protected _update(model: T): Observable<T> {
    let requestParams = this._getRequestParams(model.id);
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  protected _create(model: T): Observable<T> {
    let requestParams = this._getRequestParams();
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error: any) => this._handleErrors(error));
  }

  protected _getRequestParams(id?: number) {
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
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
  }

  protected _handleErrors(error: any) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

