import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminUsersModule } from './users/users.module';
import { AdminGroupsModule } from './groups/groups.module';
import { AdminEventsModule } from './events/events.module';
import { AdminFormsModule } from './forms/forms.module';
import { AdminProjectsModule } from './projects/projects.module';
import { AdminEmailTemplatesModule } from './email-templates/email-templates.module';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      redirectTo: '/admin/users',
      pathMatch: 'full'
    }, {
      path: 'users',
      loadChildren: () => AdminUsersModule,
      breadcrumb: 'T_USERS'
    }, {
      path: 'groups',
      loadChildren: () => AdminGroupsModule,
      breadcrumb: 'T_GROUPS'
    }, {
      path: 'forms',
      loadChildren: () => AdminFormsModule,
      breadcrumb: 'T_FORMS'
    }, {
      path: 'projects',
      loadChildren: () => AdminProjectsModule,
      breadcrumb: 'T_PROJECTS'
    }, {
      path: 'templates',
      loadChildren: () => AdminEmailTemplatesModule,
      breadcrumb: 'T_EMAIL_TEMPLATES'
    }, {
      path: 'events',
      loadChildren: () => AdminEventsModule,
      breadcrumb: 'T_EVENTS'
    }])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
