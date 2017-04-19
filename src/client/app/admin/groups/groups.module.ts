import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupDetailsComponent } from "./group-details.component";

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupListComponent,
    GroupDetailsComponent
  ],
  exports: [
    GroupListComponent,
    GroupDetailsComponent
  ],
})
export class GroupsModule {
}

