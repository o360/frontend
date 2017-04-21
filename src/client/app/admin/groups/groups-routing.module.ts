import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupFormComponent } from './group-form.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailsComponent } from './group-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: GroupListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: 'create',
      component: GroupFormComponent,
      data: { breadcrumb: 'T_ACTION_CREATE' },
    }, {
      path: ':id',
      component: GroupDetailsComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: ':id/edit',
      component: GroupFormComponent,
      data: { breadcrumb: 'T_ACTION_EDIT' },
    }])
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
