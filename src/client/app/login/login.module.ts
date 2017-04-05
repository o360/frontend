import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './oauth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OAuthComponent } from './oauth.component';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';


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
  ],
  providers: [LoginService]
})
export class LoginModule {
}

