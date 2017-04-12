import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthServiceLoader } from "./guards/auth-service.loader";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    LanguageSelectorComponent,
    SidebarNavComponent,
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent
  ],
  providers: [
    UserService,
    AuthService,
    AccountService,
    AuthGuard,
    AuthServiceLoader
  ],
  exports: [
    HeaderComponent,
    LanguageSelectorComponent,
    SidebarNavComponent,
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
