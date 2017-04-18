import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    GroupsRoutingModule,
    SharedModule
  ],
  declarations: [
    GroupListComponent
  ],
  exports: [
    GroupListComponent
  ]
})
export class GroupsModule {
}

