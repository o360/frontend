import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupDetailsComponent } from './group-details.component';
import { GroupFormComponent } from './group-form.component';
import { GroupUserListComponent } from './group-user-list.component';
import { UsersAddModalComponent } from './users-add-modal.component';

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupUserListComponent,
    UsersAddModalComponent
  ],
  exports: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupUserListComponent,
    UsersAddModalComponent
  ],
})
export class GroupsModule {
}
