import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { EventService } from '../../core/services/event.service';
import { EventModel, EventStatus } from '../../core/models/event-model';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-project-list',
  templateUrl: 'event-project-list.component.html'
})
export class EventProjectListComponent extends ListComponent<ProjectModel> implements OnChanges, OnInit {
  private _event: EventModel;

  public get event(): EventModel {
    return this._event;
  }

  @Input()
  public set event(value: EventModel) {
    this._event = value;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              protected _eventService: EventService) {
    super(service, activatedRoute, router);
  }

  public ngOnInit() {
    if (!!this._event.id) {
      this._queryParams.eventId = this._event.id.toString();
    }
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['eventId']) {
      Object.assign(this._queryParams, { eventId: this._event.id.toString() });
      this._update();
    }
  }

  public delete(projectId?: ModelId) {
    this._eventService.removeProject(this._event.id, projectId).subscribe(() => this._update());
  }

  public projectsAdded() {
    this._update();
  }
}
