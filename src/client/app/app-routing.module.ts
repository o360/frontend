import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AuthServiceLoader } from './core/guards/auth-service.loader';
import { AdminModule } from './admin/admin.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { RegistrationModule } from './new-account/registration.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  imports: [
    RouterModule.forRoot([{
      path: '',
      canActivate: [AuthServiceLoader],
      canActivateChild: [AuthGuard],
      component: LayoutComponent,
      data: { breadcrumbIgnore: true },
      children: [
        // Children modules
        { path: '', loadChildren: () => HomeModule },
        { path: 'admin', data: {breadcrumb: 'T_ADMIN'}, loadChildren: () => AdminModule },
        { path: 'profile', data: { breadcrumb: 'T_PROFILE' }, loadChildren: () => UserProfileModule }
      ]
    }, {
      path: 'login',
      loadChildren: () => LoginModule
    }, {
      path: 'new',
      loadChildren: () => RegistrationModule
    }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

