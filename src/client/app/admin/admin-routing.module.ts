import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { FormsModule } from './forms/forms.module';
import { ProjectsModule } from './projects/projects.module';
import { EmailTemplatesModule } from './email-templates/email-templates.module';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      redirectTo: '/admin/users',
      pathMatch: 'full'
    }, {
      path: 'users',
      data: { breadcrumb: 'T_USERS' },
      loadChildren: () => UsersModule
    }, {
      path: 'groups',
      data: { breadcrumb: 'T_GROUPS' },
      loadChildren: () => GroupsModule
    }, {
      path: 'forms',
      data: { breadcrumb: 'T_FORMS' },
      loadChildren: () => FormsModule
    }, {
      path: 'projects',
      data: { breadcrumb: 'T_PROJECTS' },
      loadChildren: () => ProjectsModule
    }, {
      path: 'templates',
      data: { breadcrumb: 'T_EMAIL_TEMPLATES' },
      loadChildren: () => EmailTemplatesModule
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
