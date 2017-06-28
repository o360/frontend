import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AppRoute } from '../../models/app-routes.model';
import { BreadcrumbService, IBreadcrumbUrl } from '../../services/breadcrumb.service';

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

  constructor(protected _router: Router,
              protected _breadcrumbService: BreadcrumbService) {
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

    let newState: IBreadcrumb[] = [];

    while (child) {
      let routeConfig = <AppRoute>child.routeConfig;
      let label = this._extractRouteName(child);
      let parts: string[] = child.url.map(x => x.path);

      path = path.concat(parts);

      if (!routeConfig.breadcrumbIgnore) {
        newState.push({
          label: label,
          url: '/' + path.join('/')
        });
      }

      child = child.firstChild;
    }

    this._breadcrumbs = newState;

    this._breadcrumbService.nameChange.subscribe((value: IBreadcrumbUrl) => {
      let groupParent = {
        label: value.label,
        url: (value.type === 'group') ? '/admin/groups/' + value.url : '/admin/projects/' + value.url
      };
      newState.splice(2, 0, groupParent);
      return newState;
    });

    this._breadcrumbService.nameEntity.subscribe((value: IBreadcrumbUrl) => {
      newState.slice(-1)[0].label = value;
      return this._breadcrumbs = newState;
    });
  }

  private _extractRouteName(route: ActivatedRouteSnapshot) {
    let name = (<AppRoute>route.routeConfig).breadcrumb;
    return name || this._prepareRouteName(route.url.join('/'));
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
