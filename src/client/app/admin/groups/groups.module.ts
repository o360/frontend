import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupChildListComponent } from './group-child-list.component';

@NgModule({
  imports: [
    GroupsRoutingModule,
    SharedModule
  ],
  declarations: [
    GroupListComponent,
    GroupChildListComponent
  ],
  exports: [
    GroupListComponent,
    GroupChildListComponent
  ],
})
export class GroupsModule {
}

