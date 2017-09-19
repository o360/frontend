import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentFormStatus, AssessmentModel, IFormAnswer } from '../core/models/assessment-model';
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
import { UserPictureService } from '../core/services/user-picture.service';
import { Observable } from 'rxjs/Observable';

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
  protected _formTabIndex: number = 0;

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

  public get formTabIndex(): number {
    return this._formTabIndex;
  }

  constructor(service: AssessmentService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: EventService,
              protected _userPictureService: UserPictureService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.projectId = this._project.id.toString();

    this._eventService.get(this._eventId).subscribe(event => this._status = event.status);

    super.ngOnInit();
    this._update().subscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, {
        projectId: this._project.id.toString()
      });
    }
  }

  public displayItem(item: AssessmentObject, index?: number) {
    this._assessmentObject = null;
    this._formTabIndex = 0;

    if (index) {
      this._formTabIndex = index;
    }

    setTimeout(() => this._assessmentObject = item);
  }

  public showNext(assessment: AssessmentModel) {
    this._update().subscribe(() => {
      if (this._assessmentObject.hasOwnProperty('user')) {
        let current = this._list.find(assessment => assessment.user.id === (<AssessmentModel>this._assessmentObject).user.id);
        this._assessmentObject = current;

        let notAnsweredFormIndex = (<AssessmentModel>this._assessmentObject).forms.findIndex(_ => _.status === AssessmentFormStatus.New);

        if (notAnsweredFormIndex >= 0) {
          this.displayItem(this._assessmentObject, notAnsweredFormIndex);
        } else {
          let notAnsweredUsers = this._list.filter(_ => !!_.user && !_.isAnswered);

          if (notAnsweredUsers.length) {
            let next = this._list.filter(_ => !!_.user && !_.isAnswered)[0];
            this.displayItem(next);
          } else if (!!this._list.find(_ => !_.user)) {
            let notAnsweredSurveys = this._list.find(_ => !_.user).forms.filter(_ => _.status === AssessmentFormStatus.New);
            let next = notAnsweredSurveys[0];
            this.displayItem(next);
          } else {
            this._finishProjectAssessment();
          }
        }
      } else {
        let surveys = this._list.find(_ => !_.user).forms;
        let currentSurvey = surveys.findIndex(formObj => formObj.form.id === (<IFormAnswer>assessment.form).formId);
        surveys[currentSurvey].status = (<IFormAnswer>assessment.form).status;

        if (surveys.filter(_ => _.status === AssessmentFormStatus.New).length) {
          let next = surveys.filter(_ => _.status === AssessmentFormStatus.New)[0];
          this.displayItem(next);
        } else {
          let notAnsweredUsers = this._list.filter(_ => !!_.user && !_.isAnswered);
          if (notAnsweredUsers.length) {
            let next = this._list.filter(_ => !!_.user && !_.isAnswered)[0];
            this.displayItem(next);
          } else {
            this._finishProjectAssessment();
          }
        }
      }
    });
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
      projectId: this._project.id.toString()
    };

    (<AssessmentService>this._service).saveBulk(this._answers, postQueryParams).subscribe(() => {
      this._notificationService.success('T_SUCCESS_SAVED');
      this._isAnswered = !this._list.find(x => !x.isAnswered);
    });
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

  protected _update(): Observable<any> {
    this._answers = [];
    return this._fetch().map(list => this._list = list);
  }

  protected _fetch(): Observable<any> {
    let observable = new Observable((observer) => {
      this._service.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
        let list = res.data
          .sort((x, y) => {
            return !!x.user && !!y.user && x.user.name < y.user.name ? -1 : 1;
          })
          .sort(assessment => !!assessment.user ? -1 : 1);

        list.forEach(assessment => {
          assessment.isClassic = !!assessment.user;
          assessment.isAnswered = !assessment.forms.find(x => x.status === AssessmentFormStatus.New);
          assessment.forms
            .sort((x: IFormAnswer, y: IFormAnswer) => x.form.name < y.form.name ? -1 : 1)
            .forEach(form => form.isLast = false);

          if (assessment.user && assessment.user.hasPicture) {
            this._userPictureService.getPicture(assessment.user.id).subscribe(pic => assessment.user.picture = pic);
          }

          this._isClear = !assessment.isAnswered;
        });

        let notAnsweredList = list.filter(assessment => !assessment.isAnswered);
        if (notAnsweredList.length === 1) {
          let notAnsweredLastForms = notAnsweredList[0].forms.filter(form => form.status === AssessmentFormStatus.New);
          if (notAnsweredLastForms.length === 1) {
            notAnsweredLastForms[0].isLast = true;
          }
        }

        observer.next(list);
        observer.complete();
        this._isAnswered = !list.find(x => !x.isAnswered);

        if (this._assessmentObject && this._assessmentObject.userId) {
          this._assessmentObject = list.find(x => x.user.id === this._assessmentObject.userId);
        }

      }, error => observer.error(error));
    });
    return observable;
  }

  protected _finishProjectAssessment() {
    this._notificationService.success('T_ASSESSMENT_PROJECT_FINISH');
  }
}
