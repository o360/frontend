import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { OAuthComponent } from './oauth.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
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
