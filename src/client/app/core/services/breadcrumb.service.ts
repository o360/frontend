import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface IBreadcrumbUrl {
  type: string;
  label: string;
  url: string;
}

@Injectable()
export class BreadcrumbService {
  public nameChange: Subject<object> = new Subject<object>();
  public nameEntity: Subject<object> = new Subject<object>();

  public load(label: string, url: string, type: string) {
    let breadcrumb: IBreadcrumbUrl = {
      type: type,
      label: label,
      url: url
    };
    this.nameChange.next(breadcrumb);
  }

  public loadEntityName(model) {
    if (model.name) {
      let breadcrumbName = {
        name: model.name
      };
      this.nameEntity.next(breadcrumbName);
    }
  }
}

