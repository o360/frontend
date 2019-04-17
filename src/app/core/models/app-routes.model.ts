import { Route } from '@angular/router';

export interface AppRoute extends Route {
  breadcrumb?: string;
  breadcrumbIgnore?: boolean;
  children: AppRoutes;
}

export declare type AppRoutes = AppRoute[];
