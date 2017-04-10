import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OAuthComponent } from './oauth.component';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../core/services/authentication.service';
import { AuthGuard } from '../core/guards/auth.guard';


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
  providers: [
    AuthenticationService,
    AuthGuard
  ]
})
export class LoginModule {
}

