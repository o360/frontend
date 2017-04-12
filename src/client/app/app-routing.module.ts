import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { AuthServiceLoader } from './core/guards/auth-service.loader';

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
        { path: 'users', data: { breadcrumb: 'T_USERS' }, loadChildren: () => UserModule }
      ]
    }, {
      path: 'login',
      loadChildren: () => LoginModule
    }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

