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
import { EventService } from '../core/services/event.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment-event',
  templateUrl: 'assessment-event.component.html'
})
export class AssessmentEventComponent extends ListComponent<AssessmentModel> implements OnInit, OnChanges {
  protected _projectId: ModelId;
  protected _eventId: ModelId;
  protected _forms: FormModel[];
  protected _answers: AssessmentModel[] = [];
  protected _answersChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _inline: boolean;
  protected _queryParams: IQueryParams = {};
  protected _assessmentObject: AssessmentObject = null;
  protected _status: string;

  @Input()
  public set projectId(value: ModelId) {
    this._projectId = value;
  }

  public get projectId(): ModelId {
    return this._projectId;
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

  @Output()
  get answersChange(): EventEmitter<AssessmentModel> {
    return this._answersChange;
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
    this._queryParams.projectId = this._projectId.toString();

    this._eventService.get(this._eventId).subscribe(event => this._status = event.status);

    super.ngOnInit();
  }

  public _update() {
    this._service.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      this._meta = res.meta;
      this._list = res.data;
      this._list.forEach(assessment => {
        assessment.isClassic = !!assessment.user;
        assessment.isAnswered = !assessment.forms.find(x => !x.answers.length);
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, {
        eventId: this._eventId.toString(),
        projectId: this._projectId.toString()
      });
      this._update();
    }
  }

  public displayItem(item: AssessmentObject) {
    this._assessmentObject = null;

    setTimeout(() => this._assessmentObject = item);
  }

  public formChanged(value: any) {
    let sameAnswer = this._answers.find(x => x.userId === value.userId);

    if (!!sameAnswer) {
      let index = this._answers.indexOf(sameAnswer);
      this._answers[index] = value;
    } else {
      this._answers.push(value);
    }
  }

  public save() {
    let postQueryParams: IQueryParams = {
      eventId: this._eventId.toString(),
      projectId: this._projectId.toString()
    };

    this._answers.forEach(assessment => {
      (<AssessmentService>this._service).save(assessment, postQueryParams).subscribe();
    });

    this._update();
  }

  public formSaved() {
    this._update();
  }

  public userSearch(searchUser: AssessmentModel[]) {
    this._list = searchUser;
  }
}
