import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailsFormComponent } from './user-form.component';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'users',
      children: [{
        path: '',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: UserDetailsFormComponent
      },
      {
        path: 'create/:id',
        component: UserDetailsFormComponent
      },
      {
        path: 'detail/:id',
        component: UserDetailsComponent
      }
      ]
    }])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routedComponents = [UserListComponent, UserDetailsFormComponent, UserDetailsComponent];
