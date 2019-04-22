import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event.routing.module';
import { EventListComponent } from './event-list.component';
import { EventTabsComponent } from './event-tabs.component';
import { AssessmentProjectListComponent } from './assessment-project-list.component';
import { AssessmentEventComponent } from './assessment-event.component';
import { AssessmentFormComponent } from './assessment-form.component';
import { AssessmentObjectListComponent } from './assessment-object-list.component';
import { AssessmentFormModalComponent } from './assessment-form-modal.component';

@NgModule({
  imports: [
    SharedModule,
    EventRoutingModule
  ],
  declarations: [
    EventListComponent,
    EventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    AssessmentFormComponent,
    AssessmentObjectListComponent,
    AssessmentObjectListComponent,
    AssessmentFormModalComponent
  ],
  exports: [
    EventListComponent,
    EventTabsComponent,
    AssessmentProjectListComponent,
    AssessmentEventComponent,
    AssessmentObjectListComponent,
    AssessmentFormModalComponent,
    AssessmentFormComponent,
    AssessmentObjectListComponent
  ],
})
export class EventModule {
}
