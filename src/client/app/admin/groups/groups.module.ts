import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupDetailsComponent } from './group-details.component';
import { GroupFormComponent } from './group-form.component';
import { GroupUserListComponent } from './group-user-list.component';

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupUserListComponent
  ],
  exports: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupUserListComponent
  ],
})
export class GroupsModule {
}
