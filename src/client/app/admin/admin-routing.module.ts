import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      redirectTo: '/admin/users',
      pathMatch: 'full'
    },{
      path: 'users',
      data: { breadcrumb: 'T_USERS' },
      loadChildren: () => UsersModule
    }, {
      path: 'groups',
      data: { breadcrumb: 'T_GROUPS' },
      loadChildren: () => GroupsModule
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
