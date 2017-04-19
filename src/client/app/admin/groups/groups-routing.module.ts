import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list.component';
import { GroupDetailsComponent } from './group-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: GroupListComponent,
      data: { breadcrumbIgnore: true },
    }, {
      path: ':id',
      component: GroupDetailsComponent,
      data: { breadcrumbIgnore: true },
    }])
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
