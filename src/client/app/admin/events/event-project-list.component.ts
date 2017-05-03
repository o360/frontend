import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { EventService } from '../../core/services/event.service';

@Component({
  moduleId: module.id,
  selector: 'bs-event-project-list',
  templateUrl: 'event-project-list.component.html'
})
export class EventProjectListComponent extends ListComponent<ProjectModel> implements OnChanges, OnInit {
  private _eventId: ModelId;

  @Input()
  public set eventId(value: ModelId) {
    this._eventId = value;
  }

  public get eventId(): ModelId {
    return this._eventId;
  }

  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              protected _eventService: EventService) {
    super(service, activatedRoute, router);
  }

  public ngOnInit() {
    this._queryParams.eventId = this._eventId.toString();
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['eventId']) {
      Object.assign(this._queryParams, { eventId: this._eventId.toString() });
      this._update();
    }
  }

  public delete(projectId?: ModelId) {
    this._eventService.removeProject(this._eventId, projectId).subscribe(() => this._update());
  }

  public projectsAdded() {
    this._update();
  }
}
