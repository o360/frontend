import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { OAuthComponent } from './oauth.component';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: LoginComponent
    }, {
      path: ':provider',
      component: OAuthComponent
    }])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
