import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OAuthComponent } from './oauth.component';
import { LoginComponent } from './login.component';

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

