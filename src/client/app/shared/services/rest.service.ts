import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class RestService<T> {
  protected _serviceUrl = 'https://model-service-51554.firebaseio.com'; // add this one to User service
  protected _entityName: string;
  protected _entityConstructor: { new (json: Object): T };
  protected _servicePath = 'assets/data.json'; // test path

  constructor(protected _http: Http) { }

  public list(): Observable<T[]> {
    return this._http.get(this._getRequestParams())
      .map((response: Response) => Object.assign(response.json()))
      // .map(((response: Response) ==='object') ? Object.values(response: Response) : response)
      .map((json: Object[]) => json.map(x => new this._entityConstructor(x)));
  }

  public get(id: number): Observable<T> {
    return this._http.get(this._getRequestParams(id))
      .map((response: Response) => response.json())
      .map((json: Object) => new this._entityConstructor(json))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      // .catch(error: any=>  { alert(`Can't get users.`));
  }

  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      this._update(model, model.id);
    } else {
      this._create(model);
    }
  }

  public delete(id: number): Observable<void> {
    return this._http.delete(this._getRequestParams(id),this._getRequestOptions())
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  protected _update(model: T, id: number) {
    return this._http.put(this._getRequestParams(id), JSON.stringify(model), this._getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  protected _create(model: T) {
    return this._http.post(this._getRequestParams(), JSON.stringify(model), this._getRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe();
  }

  protected _getRequestParams(id?: number) {
    let path: string[] = [];

    path.push(this._serviceUrl);
    path.push(this._entityName);

    if (id !== undefined) {
      path.push(id.toString());
    }
    console.log(path.join('/')+'.json');
    return path.join('/')+'.json';
  }

  protected _getRequestOptions() {
    return new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
  }
}

