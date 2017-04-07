import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { OAuthComponent } from './oauth.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  exports: [LoginComponent, OAuthComponent],
  declarations: [LoginComponent, OAuthComponent],
  providers: [],
})
export class LoginModule {
}
