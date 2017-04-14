import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { UserDetailsComponent } from './user-details.component';
import { UserListComponent } from './user-list.component';
import { AuthGuard } from '../core/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: UserListComponent,
      data: { breadcrumbIgnore: true },
    }
    // , {
    //   path: ':id',
    //   component: UserDetailsComponent,
    //   data: { breadcrumb: 'T_USER_DETAILS' },
    // }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
