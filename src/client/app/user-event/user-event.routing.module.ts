import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../core/models/app-routes.model';
import { UserEventTabsComponent } from './user-event-tabs.component';


@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: UserEventTabsComponent,
      breadcrumbIgnore: true,
    }])
  ],
  exports: [RouterModule]
})
export class UserEventRoutingModule {
}
