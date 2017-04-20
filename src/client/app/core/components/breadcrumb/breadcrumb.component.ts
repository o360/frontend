import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

interface IBreadcrumb {
  label: string;
  url: string;
}

@Component({
  moduleId: module.id,
  selector: 'bs-breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  private _breadcrumbs: IBreadcrumb[];

  public get breadcrumbs(): IBreadcrumb[] {
    return this._breadcrumbs;
  }

  constructor(protected _router: Router) {
    this._breadcrumbs = [];
  }


  public ngOnInit() {
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => this._updateBreadcrumbs());
  }

  private _updateBreadcrumbs() {
    let child = this._router.routerState.snapshot.root.firstChild;
    let path: string[] = [];

    let newState = [];

    while (child) {
      let label = this._extractRouteName(child);
      let parts: string[] = child.url.map(x => x.path);

      path = path.concat(parts);

      if (!child.data.breadcrumbIgnore) {
        newState.push({
          label: label,
          url: '/' + path.join('/')
        });
      }

      child = child.firstChild;
    }

    this._breadcrumbs = newState;
  }

  private _extractRouteName(routeConfig: ActivatedRouteSnapshot) {
    let name = routeConfig.data.breadcrumb;
    return name || this._prepareRouteName(routeConfig.url.join('/'));
  }

  private _prepareRouteName(name: string) {
    if (name.length > 0) {
      name = name.split(' ').map(this._capitalizeFirstLetter).join('');
      name = name.split(/(?=[A-Z])/).join(' ');
    }
    return name;
  }

  private _capitalizeFirstLetter(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }
}

