import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './event-form.component';
import { EventDetailsComponent } from './event-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';


@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: EventListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: EventFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: EventDetailsComponent,
      breadcrumb: 'T_EVENT_DETAILS',
    }, {
      path: ':id/edit',
      component: EventFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
