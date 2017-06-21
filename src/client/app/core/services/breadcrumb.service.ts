import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BreadcrumbService {
  public nameChange: Subject<object> = new Subject<object>();

  public load(label: string, url: string, type: string) {
    let breadcrumb = {
      type: type,
      label: label,
      url: url
    };
    this.nameChange.next(breadcrumb);
  }
}

