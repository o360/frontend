import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DialogService {

  public confirm (message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure?');

    return of(confirmation);
  }
}
