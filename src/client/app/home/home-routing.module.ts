import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'T_HOME' },
        canActivate: [AuthGuard],
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
