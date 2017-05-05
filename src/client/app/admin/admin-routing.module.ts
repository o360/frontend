import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { FormsModule } from './forms/forms.module';
import { ProjectsModule } from './projects/projects.module';
import { EmailTemplatesModule } from './email-templates/email-templates.module';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      redirectTo: '/admin/users',
      pathMatch: 'full'
    }, {
      path: 'users',
      breadcrumb: 'T_USERS',
      loadChildren: () => UsersModule
    }, {
      path: 'groups',
      breadcrumb: 'T_GROUPS',
      loadChildren: () => GroupsModule
    }, {
      path: 'forms',
      breadcrumb: 'T_FORMS',
      loadChildren: () => FormsModule
    }, {
      path: 'projects',
      breadcrumb: 'T_PROJECTS',
      loadChildren: () => ProjectsModule
    }, {
      path: 'templates',
      breadcrumb: 'T_EMAIL_TEMPLATES',
      loadChildren: () => EmailTemplatesModule
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
