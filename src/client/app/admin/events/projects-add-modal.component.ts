import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../../core/models/model';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { EventService } from '../../core/services/event.service';

interface ISelectProject {
  id: ModelId;
  text: string;
}
@Component({
  moduleId: module.id,
  selector: 'bs-projects-add-modal',
  templateUrl: 'projects-add-modal.component.html'
})
export class ProjectsAddModalComponent implements OnChanges, OnInit {
  private _eventId: ModelId;
  private _selectedProjects: ModelId[] = [];
  private _modal: ModalDirective;
  private _projectsAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();
  private _options: Select2Options;
  private _selectItems: ISelectProject[] = [];

  @Input()
  public set eventId(value: ModelId) {
    this._eventId = value;
  }

  public get options(): Select2Options {
    return this._options;
  }

  public get selectItems(): ISelectProject[] {
    return this._selectItems;
  }

  @Output()
  public get projectsAdded(): EventEmitter<ModelId[]> {
    return this._projectsAdded;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  constructor(protected _projectService: ProjectService,
              protected _eventService: EventService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this._options = {
      allowClear: true,
      placeholder: '',
      multiple: true,
      openOnEnter: true,
      closeOnSelect: true,
    };
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._load();
    }
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    if (this._selectedProjects.length > 0) {
      let transaction = this._selectedProjects.map(projectId => this._eventService.addProject(this._eventId, projectId));

      Observable.forkJoin(transaction).subscribe(() => {
        this._modal.hide();
        this._projectsAdded.emit(this._selectedProjects);
        this._notificationService.success('T_PROJECTS_ADDED_TO_EVENT');
      });
    }
  }

  public selectProject(value: { value: string[] }) {
    this._selectedProjects = [];
    if (value.value) {
      value.value.forEach((id => {
        this._selectedProjects.push(id);
      }));
    }
  }

  protected _load() {
    let eventQueryParams = { eventId: this._eventId.toString() };

    Observable
      .forkJoin(
        this._projectService.list(),
        this._projectService.list(eventQueryParams)
      )
      .map(([allProjects, eventProjects]: IListResponse<ProjectModel>[]) => {
        return allProjects.data.filter(project => !eventProjects.data.find(x => x.id === project.id));
      })
      .subscribe((availableProjects: ProjectModel[]) => {
        let availableForSelectionProjects: ISelectProject[] = [];
        availableProjects.map((project: ProjectModel) => {
          availableForSelectionProjects.push({ id: project.id, text: project.name });
        });
        this._selectItems = availableForSelectionProjects;
      });
    this._selectedProjects = [];
  }
}
