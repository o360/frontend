import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppInitService {
  constructor(protected _http: HttpClient) {
  }

  /**
   * Initialize app by downloading configuration file
   */
  public init(): Promise<any> {
    return this._http.get('/assets/config.json').toPromise();
  }
}
