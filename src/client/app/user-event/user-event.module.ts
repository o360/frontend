import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserEventRoutingModule } from './user-event.routing.module';
import { UserEventListComponent } from './user-event-list.component';
import { UserEventTabsComponent } from './user-event-tabs.component';
import { AssessmentProjectListComponent } from './assessment-project-list.component';
import { AssessmentEventComponent } from './assessment-event.component';
import { UserAssessmentFormComponent } from './assessment-form.component';
import { AssessmentObjectListComponent } from './assessment-object-list.component';


@NgModule({
  imports: [
    SharedModule,
    UserEventRoutingModule
  ],
  declarations: [
    UserEventListComponent,
    UserEventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    UserAssessmentFormComponent,
    AssessmentObjectListComponent
  ],
  exports: [
    UserEventListComponent,
    UserEventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    UserAssessmentFormComponent,
    AssessmentObjectListComponent
  ],
})
export class UserEventModule {
}
