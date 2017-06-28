import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupFormComponent } from './group-form.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailsComponent } from './group-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: GroupListComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'create',
      component: GroupFormComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: GroupDetailsComponent,
      breadcrumb: 'T_GROUP_DETAILS',
    }, {
      path: ':id',
      component: GroupDetailsComponent,
      breadcrumb: 'T_GROUP_DETAILS',
    }, {
      path: ':id/edit',
      component: GroupFormComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
