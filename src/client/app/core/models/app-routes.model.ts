import { ActivatedRouteSnapshot, Route } from '@angular/router';

export class AppActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  breadcrumb?: string;
  breadcrumbIgnore?: boolean = false;
  routeConfig: AppRoute;
  firstChild: AppActivatedRouteSnapshot;
}

export interface AppRoute extends Route {
  breadcrumb?: string;
  breadcrumbIgnore?: boolean;
  children: AppRoutes;
}

export declare type AppRoutes = AppRoute[];
