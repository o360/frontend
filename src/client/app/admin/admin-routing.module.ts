import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { EventsModule } from './events/events.module';
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
      loadChildren: () => UsersModule,
      breadcrumb: 'T_USERS'
    }, {
      path: 'groups',
      loadChildren: () => GroupsModule,
      breadcrumb: 'T_GROUPS'
    }, {
      path: 'forms',
      loadChildren: () => FormsModule,
      breadcrumb: 'T_FORMS'
    }, {
      path: 'projects',
      loadChildren: () => ProjectsModule,
      breadcrumb: 'T_PROJECTS'
    }, {
      path: 'templates',
      loadChildren: () => EmailTemplatesModule,
      breadcrumb: 'T_EMAIL_TEMPLATES'
    }, {
      path: 'events',
      loadChildren: () => EventsModule,
      breadcrumb: 'T_EVENTS'
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
