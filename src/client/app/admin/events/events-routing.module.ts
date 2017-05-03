import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './event-form.component';
import { EventDetailsComponent } from './event-details.component';


@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: EventListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'create',
      component: EventFormComponent,
      data: { breadcrumb: 'T_ACTION_CREATE' },
    }, {
      path: ':id',
      component: EventDetailsComponent,
      data: {  breadcrumb: 'T_EVENT_DETAILS' },
    }, {
      path: ':id/edit',
      component: EventFormComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
