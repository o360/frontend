import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventStatus } from '../core/models/event-model';
import { ListComponent } from '../shared/components/list.component';
import { ProjectModel } from '../core/models/project-model';
import { ModelId } from '../core/models/model';
import { ProjectService } from '../core/services/project.service';
import { NotificationService } from '../core/services/notification.service';
import { EventService } from '../core/services/event.service';


@Component({
  moduleId: module.id,
  selector: 'bs-assessment',
  templateUrl: 'assessment-project-list.component.html'
})
export class AssessmentProjectListComponent extends ListComponent<ProjectModel> implements OnInit {
  protected _eventId: ModelId;
  protected _eventStatus: EventStatus;

  public get eventId(): ModelId {
    return this._eventId;
  }

  public get eventStatus(): EventStatus {
    return this._eventStatus;
  }

  public get EventStatus() {
    return EventStatus;
  }


  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: EventService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._eventId = params['id'];
      this._queryParams.eventId = this._eventId.toString();
      this._update();
    });

    this._getStatus();
  }

  public answerChanged() {
    this._update();
  }

  protected _update() {
    Object.assign(this._queryParams, { onlyAvailable: 'true' });
    super._update();
  }

  protected _getStatus() {
    this._eventService.get(this._eventId).subscribe(model =>
      this._eventStatus = model.status
    );
  }
}
