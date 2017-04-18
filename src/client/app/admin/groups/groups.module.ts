import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupChildrenListComponent } from './group-user-list.component';

@NgModule({
  imports: [
    GroupsRoutingModule,
    SharedModule
  ],
  declarations: [
    GroupListComponent,
    GroupChildrenListComponent
  ],
  exports: [
    GroupListComponent,
    GroupChildrenListComponent
  ],
})
export class GroupsModule {
}

