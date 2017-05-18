import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../core/models/app-routes.model';
import { UserEventTabsComponent } from './user-event-tabs.component';
import { AssessmentProjectListComponent } from './assessment-project-list.component';


@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: UserEventTabsComponent,
      breadcrumbIgnore: true,
    }, {
      path: ':id',
      component: AssessmentProjectListComponent,
      breadcrumb: 'T_ASSESSMENT_EVENT'
    }])
  ],
  exports: [RouterModule]
})
export class UserEventRoutingModule {
}
