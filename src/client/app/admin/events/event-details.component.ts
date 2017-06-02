import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { IListResponse, IQueryParams } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-details',
  templateUrl: 'event-details.component.html'
})
export class EventDetailsComponent extends DetailsComponent<EventModel> {
  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              route: ActivatedRoute,
              private _projectService: ProjectService,
              private _router: Router,
              private _notificationService: NotificationService) {
    super(service, route);
  }

  public clone(model: EventModel) {
    (<EventService>this._service).clone(model).subscribe(clone => {
      let queryParams: IQueryParams = {};
      queryParams.eventId = model.id.toString();
      this._projectService.list(queryParams).subscribe((res: IListResponse<ProjectModel>) => {
        let projectsId = res.data.map(function (element) {
          return element.id;
        });
        projectsId.map(projectId => (<EventService>this._service).addProject(clone.id, projectId).subscribe());
        this._router.navigate(['/admin/events', clone.id, 'clone']);
      });
      this._notificationService.success('T_SUCCESS_CLONED_EVENT');
    });
  }
}
