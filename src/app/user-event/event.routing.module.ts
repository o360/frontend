import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../core/models/app-routes.model';
import { EventTabsComponent } from './event-tabs.component';
import { AssessmentProjectListComponent } from './assessment-project-list.component';
import { CanDeactivateGuard } from '../core/guards/deactivate.guard';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: EventTabsComponent,
      breadcrumbIgnore: true,
    }, {
      path: ':id',
      component: AssessmentProjectListComponent,
      breadcrumb: 'T_ASSESSMENT_EVENT',
      canDeactivate: [CanDeactivateGuard]
    }])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
