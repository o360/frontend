import { forkJoin as observableForkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ModelId } from '../../core/models/model';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { AdminEventService } from '../../core/services/admin-event.service';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../utils';

interface ISelectProject {
  id: ModelId;
  text: string;
}

@Component({
  selector: 'bs-projects-add-modal',
  templateUrl: 'projects-add-modal.component.html'
})
export class AdminProjectsAddModalComponent implements OnChanges, OnInit {
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

  constructor(protected _projectService: AdminProjectService,
              protected _eventService: AdminEventService,
              protected _notificationService: NotificationService,
              protected _translate: TranslateService) {
  }

  public ngOnInit() {
    this._options = {
      allowClear: true,
      placeholder: '',
      multiple: true,
      openOnEnter: true,
      closeOnSelect: true,
      dropdownAutoWidth: true,
      escapeMarkup: (term: any) => {
        return (term === 'No results found') ? this._translate.instant('T_EMPTY') : term;
      },
      matcher: (term: string, text: string) => {
        return new RegExp(term, 'gi').test(text) ||
          new RegExp(term, 'gi').test(Utils.transliterate(text));
      }
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

      observableForkJoin(transaction).subscribe(() => {
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

    observableForkJoin(
      this._projectService.list(),
      this._projectService.list(eventQueryParams)
    ).pipe(
      map(([allProjects, eventProjects]: IListResponse<ProjectModel>[]) => {
        return allProjects.data.filter(project => !eventProjects.data.find(x => x.id === project.id));
      }))
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
