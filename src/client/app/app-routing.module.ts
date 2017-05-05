import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthServiceLoader } from './core/guards/auth-service.loader';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './new-account/registration.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AppRoutes } from './core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forRoot(<AppRoutes>[{
      path: '',
      canActivate: [AuthServiceLoader],
      canActivateChild: [AuthGuard],
      component: LayoutComponent,
      breadcrumbIgnore: true,
      children: [
        // Children modules
        { path: '', loadChildren: () => HomeModule },
        { path: 'admin', breadcrumb: 'T_ADMINISTRATION', loadChildren: () => AdminModule },
        { path: 'profile', breadcrumb: 'T_PROFILE', loadChildren: () => UserProfileModule }
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

