import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { UserFormComponent } from './user-form.component';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'users',
      children: [{
        path: '',
        component: UserListComponent,
      }, {
        path: 'create',
        component: UserFormComponent,
      }, {
        path: ':id',
        component: UserDetailsComponent
      }, {
        path: ':id/edit',
        component: UserFormComponent
      }]
    }])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
