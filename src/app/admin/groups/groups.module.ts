import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { AdminGroupListComponent } from './group-list.component';
import { AdminGroupsRoutingModule } from './groups-routing.module';
import { AdminGroupDetailsComponent } from './group-details.component';
import { AdminGroupFormComponent } from './group-form.component';
import { AdminGroupUserListComponent } from './group-user-list.component';
import { AdminUsersAddModalComponent } from './users-add-modal.component';
import { AdminChildGroupListComponent } from './child-group-list.component';
import { AdminGroupProjectListComponent } from './group-project-list.component';
import { AdminGroupInviteFormComponent } from './group-invite-form.component';

@NgModule({
  imports: [
    SharedModule,
    AdminGroupsRoutingModule,
    BsDropdownModule
  ],
  declarations: [
    AdminGroupListComponent,
    AdminGroupDetailsComponent,
    AdminGroupFormComponent,
    AdminGroupUserListComponent,
    AdminUsersAddModalComponent,
    AdminChildGroupListComponent,
    AdminGroupProjectListComponent,
    AdminGroupInviteFormComponent
  ],
  exports: [
    AdminGroupListComponent,
    AdminGroupDetailsComponent,
    AdminGroupFormComponent,
    AdminGroupUserListComponent,
    AdminUsersAddModalComponent,
    AdminChildGroupListComponent,
    AdminGroupProjectListComponent,
    AdminGroupInviteFormComponent
  ],
})
export class AdminGroupsModule {
}
