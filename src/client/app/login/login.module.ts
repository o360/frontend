import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { OAuthComponent } from './oauth.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  exports: [
    OAuthComponent,
    LoginComponent
  ],
  declarations: [
    OAuthComponent,
    LoginComponent
  ]
})
export class LoginModule {
}

