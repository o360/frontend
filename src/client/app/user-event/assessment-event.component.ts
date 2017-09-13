import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentModel } from '../core/models/assessment-model';
import { FormModel } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { ListComponent } from '../shared/components/list.component';
import { AssessmentObject } from './assessment-object-list.component';
import { EventStatus } from '../core/models/event-model';
import { ProjectModel } from '../core/models/project-model';
import { EventService } from '../core/services/event.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment-event',
  templateUrl: 'assessment-event.component.html'
})
export class AssessmentEventComponent extends ListComponent<AssessmentModel> implements OnInit, OnChanges {
  protected _project: ProjectModel;
  protected _eventId: ModelId;
  protected _forms: FormModel[];
  protected _answers: AssessmentModel[] = [];
  protected _answersChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _inline: boolean;
  protected _queryParams: IQueryParams = {};
  protected _assessmentObject: AssessmentObject = null;
  protected _status: string;
  protected _cleared: number = 0;
  protected _isClear: boolean = true;
  protected _isAnswered: boolean = false;

  @Input()
  public set project(value: ProjectModel) {
    this._project = value;
  }

  public get project(): ProjectModel {
    return this._project;
  }

  @Input()
  public set inline(value: boolean) {
    this._inline = value;
  }

  public get inline(): boolean {
    return this._inline;
  }

  @Input()
  public set eventId(value: ModelId) {
    this._eventId = value;
  }

  public get eventId(): ModelId {
    return this._eventId;
  }

  public get forms(): FormModel[] {
    return this._forms;
  }

  public get assessmentObject(): AssessmentObject {
    return this._assessmentObject;
  }

  public get status(): string {
    return this._status;
  }

  public get isClear(): boolean {
    return this._isClear;
  }

  @Output()
  get answersChange(): EventEmitter<AssessmentModel> {
    return this._answersChange;
  }

  public get answers(): AssessmentModel[] {
    return this._answers;
  }

  public get EventStatus() {
    return EventStatus;
  }

  public get cleared(): number {
    return this._cleared;
  }

  public get isAnswered(): boolean {
    return this._isAnswered;
  }

  constructor(service: AssessmentService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: EventService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.eventId = this._eventId.toString();
    this._queryParams.projectId = this._project.id.toString();

    this._eventService.get(this._eventId).subscribe(event => this._status = event.status);

    super.ngOnInit();
  }

  public _update() {
    this._answers = [];

    this._service.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      this._meta = res.meta;
      this._list = res.data;
      this._list
        .sort(assessment => {
          return !!assessment.user ? -1 : 1;
        })
        .forEach(assessment => {
          assessment.isClassic = !!assessment.user;
          assessment.isAnswered = !assessment.forms.find(x => !x.answers.length);
          this._isClear = !assessment.isAnswered;
        });
      this._isAnswered = !!this._list.find(x => x.isAnswered);
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, {
        eventId: this._eventId.toString(),
        projectId: this._project.id.toString()
      });
      this._update();
    }
  }

  public displayItem(item: AssessmentObject) {
    this._assessmentObject = null;

    setTimeout(() => this._assessmentObject = item);
  }

  public formChanged(value: any) {
    let sameAnswer;

    if (value) {
      sameAnswer = this._answers.find(x => ((!x.userId || x.userId === value.userId) && x.form.formId === value.form.formId));
    }

    if (sameAnswer) {
      let index = this._answers.indexOf(sameAnswer);
      this._answers[index].form.answers = value.form.answers;
    } else {
      this._answers.push(value);
    }

    this._isClear = !value.isAnswered;
  }

  public save() {
    let postQueryParams: IQueryParams = {
      eventId: this._eventId.toString(),
      projectId: this._project.id.toString()
    };

    (<AssessmentService>this._service).saveBulk(this._answers, postQueryParams).subscribe(() => {
      this._notificationService.success('T_SUCCESS_SAVED');
      this._isAnswered = true;
    });
  }

  public formSaved() {
    this._update();
  }

  public userSearch(searchUser: AssessmentModel[]) {
    this._list = searchUser;
  }

  public clear() {
    if (this._inline) {
      this._isClear = true;
      this._cleared++;
    } else {
      this._answers = [];
    }
  }
}
