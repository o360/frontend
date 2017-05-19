import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserEventRoutingModule } from './user-event.routing.module';
import { UserEventListComponent } from './user-event-list.component';
import { UserEventTabsComponent } from './user-event-tabs.component';


@NgModule({
  imports: [
    SharedModule,
    UserEventRoutingModule
  ],
  declarations: [
    UserEventListComponent,
    UserEventTabsComponent
  ],
  exports: [
    UserEventListComponent,
    UserEventTabsComponent
  ],
})
export class UserEventModule {
}
