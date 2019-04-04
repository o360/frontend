import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBreadcrumb } from '../components/breadcrumb/breadcrumb.component';

@Injectable()
export class BreadcrumbService {
  private _override: Subject<IBreadcrumb[]> = new Subject<IBreadcrumb[]>();

  public get override(): Subject<IBreadcrumb[]> {
    return this._override;
  }

  public overrideBreadcrumb(breadcrumbs: IBreadcrumb[]) {
    this._override.next(breadcrumbs);
  }
}

