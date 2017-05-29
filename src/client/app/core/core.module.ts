import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { AuthServiceLoader } from './guards/auth-service.loader';
import { AuthGuard } from './guards/auth.guard';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProfileService } from './services/profile.service';
import { NotificationService } from './services/notification.service';
import { GroupService } from './services/group.service';
import { EventService } from './services/event.service';
import { FormService } from './services/form.service';
import { ProjectService } from './services/project.service';
import { RelationService } from './services/relation.service';
import { EmailTemplateService } from './services/email-template.service';
import { AdminGuard } from './guards/admin.guard';
import { AssessmentService } from './services/assessment.service';

@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    SidebarNavComponent,
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent
  ],
  providers: [
    AuthService,
    AuthServiceLoader,
    AccountService,
    ProfileService,
    AuthGuard,
    AdminGuard,
    UserService,
    GroupService,
    NotificationService,
    EventService,
    FormService,
    ProjectService,
    EventService,
    ProjectService,
    RelationService,
    EmailTemplateService,
    AssessmentService,
    NotificationService
  ],
  exports: [
    HeaderComponent,
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
