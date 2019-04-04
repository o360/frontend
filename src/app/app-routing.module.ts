import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthServiceLoader } from './core/guards/auth-service.loader';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './new-account/registration.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AppRoutes } from './core/models/app-routes.model';
import { AdminGuard } from './core/guards/admin.guard';
import { EventModule } from './user-event/event.module';
import { AgreementModule } from './agreement/agreement.module';
import { UsersModule } from './users/users.module';

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
        { path: '', redirectTo: 'events', pathMatch: 'full' },
        { path: 'admin', canActivate: [AdminGuard], loadChildren: () => AdminModule, breadcrumb: 'T_ADMINISTRATION' },
        { path: 'profile', loadChildren: () => UserProfileModule, breadcrumb: 'T_PROFILE' },
        { path: 'events', loadChildren: () => EventModule, breadcrumb: 'T_EVENTS' },
        { path: 'users', loadChildren: () => UsersModule, breadcrumb: 'T_USERS' }
      ]
    }, {
      path: 'login',
      loadChildren: () => LoginModule
    }, {
      path: 'new',
      canActivate: [AuthServiceLoader],
      loadChildren: () => RegistrationModule
    }, {
      path: 'agreement',
      canActivate: [AuthServiceLoader],
      loadChildren: () => AgreementModule
    }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

