import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListComponent } from '../shared/components/list.component';
import { ProjectModel } from '../core/models/project-model';
import { ModelId } from '../core/models/model';
import { NotificationService } from '../core/services/notification.service';
import { ProjectService } from '../core/services/project.service';
import { EventStatus } from '../core/models/event-model';
import { EventService } from '../core/services/event.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment',
  templateUrl: 'assessment-project-list.component.html'
})
export class AssessmentProjectListComponent extends ListComponent<ProjectModel> implements OnInit {
  protected _eventId: ModelId;

  public get eventId(): ModelId {
    return this._eventId;
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
      this._eventService.get(this._eventId).subscribe(event => {
        if(event.status === EventStatus.NotStarted) {
          this._router.navigate(['events']);
        }
      });
      this._queryParams.eventId = this._eventId.toString();
      this._update();
    });
  }

  public answerChanged() {
    this._update();
  }

  protected _update() {
    Object.assign(this._queryParams, { onlyAvailable: 'true' });
    super._update();
  }
}
