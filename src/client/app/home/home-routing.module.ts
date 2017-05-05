import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: HomeComponent,
      breadcrumb: 'T_HOME'
    }])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
