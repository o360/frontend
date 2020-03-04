/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { from, Observable, of, Subscription } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentFormStatus, AssessmentModel, IFormAnswer } from '../core/models/assessment-model';
import { FormModel } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { UserModel } from '../core/models/user-model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { ListComponentDirective } from '../shared/components/list-component.directive';
import { AssessmentObject } from './assessment-object-list.component';
import { EventStatus } from '../core/models/event-model';
import { ProjectModel } from '../core/models/project-model';
import { EventService } from '../core/services/event.service';
import { UserPictureService } from '../core/services/user-picture.service';
import { Utils } from '../utils';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'bs-user-assessment-event',
  templateUrl: 'assessment-event.component.html'
})
export class AssessmentEventComponent extends ListComponentDirective<AssessmentModel> implements OnInit, OnChanges {
  private readonly _maxConcurrency = 5;

  protected _project: ProjectModel;
  protected _eventId: ModelId;
  protected _forms: FormModel[];
  protected _answers: AssessmentModel[] = [];
  protected _inline: boolean;
  protected _queryParams: IQueryParams = {};
  protected _assessmentObject: AssessmentObject = null;
  protected _status: string;
  protected _cleared: number = 0;
  protected _isClear: boolean = true;
  protected _isAnswered: boolean = false;
  protected _showNextProject: EventEmitter<any> = new EventEmitter<any>();
  protected _filteredUsers: AssessmentModel[];
  protected _users: AssessmentModel[];
  protected _surveys: IFormAnswer[];
  protected _inlineAnonymous: boolean = false;

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

  @Output()
  public get showNextProject(): EventEmitter<any> {
    return this._showNextProject;
  }

  public get filteredUsers(): AssessmentModel[] {
    return this._filteredUsers;
  }

  public get users(): AssessmentModel[] {
    return this._users;
  }

  public get surveys(): IFormAnswer[] {
    return this._surveys;
  }

  public get inlineAnonymous(): boolean {
    return this._inlineAnonymous;
  }

  public get currentUserId(): ModelId {
    return this._authService.user.id;
  }

  constructor(service: AssessmentService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _eventService: EventService,
              protected _userPictureService: UserPictureService,
              protected _authService: AuthService,
              protected _cdr: ChangeDetectorRef) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._inlineAnonymous = this._project.isAnonymous;
    this._queryParams.projectId = this._project.id.toString();
    this._eventService.get(this._eventId).subscribe(event => this._status = event.status);

    super.ngOnInit();

    this._fetching = this._update().subscribe(() => {
      if (!Array.isArray(this._users)) {
        return;
      }

      if (this._goToNextUnansweredUser()) {
        return;
      }

      if (this._goToNextNewSurvey()) {
        return;
      }

      this._goToNextProject();
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, {
        projectId: this._project.id.toString()
      });
    }
  }

  public displayItem(item: AssessmentObject) {
    this._assessmentObject = item;

    if (this._assessmentObject instanceof AssessmentModel) {
      this._assessmentObject.forms.forEach((form: IFormAnswer, index: number) => form.active = index === 0);
    } else {
      this._assessmentObject.active = true;
    }

    this._cdr.detectChanges();
  }

  public showNext(assessment: AssessmentModel) {
    if (this._fetching instanceof Subscription && !this._fetching.closed) {
      this._fetching.unsubscribe();
    }

    this._fetching = this._update(false).subscribe(() => {
      const hasSurveys = Array.isArray(this._surveys) && this._surveys.length > 0;

      if (this._assessmentObject instanceof AssessmentModel) {
        const switchTo = [
          () => this._goToNextActiveNewForm((<AssessmentModel>this._assessmentObject).forms),
          () => this._goToNextUnansweredUser((<AssessmentModel>this._assessmentObject).user),
          () => this._goToNextNewSurvey(),
          () => this._goToNextProject(),
        ];

        for (const fn of switchTo) {
          const canGoToNextEntity = fn();

          if (canGoToNextEntity) {
            return;
          }
        }
      }

      if (hasSurveys && this._goToNextNewSurvey(<IFormAnswer>this._assessmentObject)) {
        return;
      }

      this._goToNextProject();
    });
  }

  public formChanged(value: any) {
    const answerIndex = value && this._answers.findIndex(
      x => (!x.userId || x.userId === value.userId) && x.form.formId === value.form.formId
    );
    const hasAnswer = answerIndex !== undefined && answerIndex > -1;

    if (hasAnswer) {
      this._answers[answerIndex].form.answers = value.form.answers;
    } else {
      this._answers.push(value);
    }

    this._answers = this._answers.filter(
      (item: AssessmentModel) => Array.isArray(item.form.answers)
        && item.form.answers.length > 0
        && item.form.answers[0].valuesIds
        && item.form.answers[0].valuesIds.length !== 0
    );

    this._answers.forEach((item: AssessmentModel) => item.form.isAnonymous = this._inlineAnonymous);

    this._isClear = !value.isAnswered;
  }

  public save() {
    let postQueryParams: IQueryParams = {
      projectId: this._project.id.toString()

    };

    (<AssessmentService> this._service).saveBulk(this._answers, postQueryParams).subscribe(() => {
      this._notificationService.success('T_SUCCESS_SAVED');
      this._isAnswered = !this._list.find(x => !x.isAnswered);
      this._showNextProject.emit(this._list);
    });
  }

  public userSearch(searchUser: AssessmentModel[]) {
    this._filteredUsers = searchUser;
  }

  public clear() {
    if (this._inline) {
      this._isClear = true;
      this._cleared++;
    } else {
      this._answers = [];
    }
  }

  public onChangeAnonymous() {
    this._inlineAnonymous = !this._inlineAnonymous;
  }

  public trackByUserIdentity(index: number, item: AssessmentModel): ModelId {
    return item.user.id;
  }

  protected _update(loadLinkedData: boolean = true): Observable<any> {
    this._answers = [];

    return this._fetch(loadLinkedData)
      .pipe(
        tap((list: AssessmentModel[]) => this._list = list),
        tap((list: AssessmentModel[]) => this._updateStateOnDataFetched(list)),
      );
  }

  protected _updateStateOnDataFetched(list: AssessmentModel[]): void {
    this._filteredUsers = list;

    if (list.length > 0) {
      this._isClear = !list[list.length - 1].isAnswered;
    }

    this._users = list.filter(({ user }) => !!user);

    const assessmentModelWithoutUser = list.find(({ user }) => !user);
    this._surveys = !!assessmentModelWithoutUser ? assessmentModelWithoutUser.forms : null;

    this._users.sort((x, y) => x.user.name < y.user.name ? -1 : 1);

    this._isAnswered = !list.some((item: AssessmentModel) => !item.isAnswered);

    if (this._assessmentObject instanceof AssessmentModel && this._assessmentObject.user) {
      this._assessmentObject = list.find(
        (item: AssessmentModel) => item.user.id === (<AssessmentModel>this._assessmentObject).user.id
      );
    }
  }

  protected _fetch(loadLinkedData: boolean): Observable<any> {
    return this._service.list(this._queryParams)
      .pipe(
        map((res: IListResponse<AssessmentModel>) => {
          const items = res.data;
          this._meta = res.meta;

          for (const item of items) {
            item.setFormsActive(false);
          }

          if (this._project.isLast) {
            let forms = items[items.length - 1].forms;
            forms[forms.length - 1].isLast = true;
          }

          return items;
        }),
        switchMap((items: AssessmentModel[]) => from(items).pipe(
          mergeMap((item: AssessmentModel) => loadLinkedData
            ? this._fetchItemLinkedData(item)
            : this._getItemLinkedDataFromCache(item),
            this._maxConcurrency
          ),
          toArray()
        ))
      );
  }

  protected _fetchItemLinkedData(item: AssessmentModel): Observable<AssessmentModel> {
    if (!item.user || !item.user.hasPicture) {
      return of(item);
    }

    const resultItem = new AssessmentModel(item.toJson());

    return this._userPictureService.getPicture(item.user.id)
      .pipe(
        map((picture: string) => {
          resultItem.user.picture = picture;

          return resultItem;
        }),
        catchError(() => of(resultItem)),
      );
  }

  protected _getItemLinkedDataFromCache(item: AssessmentModel): Observable<AssessmentModel> {
    if (!item.user || !item.user.hasPicture) {
      return of(item);
    }

    const resultItem = new AssessmentModel(item.toJson());
    const cacheItem = this._list.find(({ id, user }) => item.id === id && item.user.id === user.id);

    if (cacheItem) {
      resultItem.user.picture = cacheItem.user.picture;
    }

    return of(resultItem);
  }

  protected _goToNextActiveNewForm(forms: IFormAnswer[]): boolean {
    const nextForm = Utils.getNext(
      forms,
      ({ active }) => active,
      ({ status }) => status === AssessmentFormStatus.New
    );

    if (!nextForm) {
      return false;
    }

    forms.forEach(form => form.active = false);
    nextForm.active = true;

    return true;
  }

  protected _goToNextUnansweredUser(user?: UserModel): boolean {
    const nextUser = user && Utils.getNext(
      this._users,
        _ => _.user.id === user.id,
        _ => !!_.user && !_.isAnswered
    );

    const nextUnansweredUser = Utils.getNext(
      this._users,
      undefined,
      _ => !_.isAnswered
    );

    if (!nextUser && !nextUnansweredUser) {
      return false;
    }

    this.displayItem(nextUser || nextUnansweredUser);

    return true;
  }

  protected _goToNextNewSurvey(formAnswer?: IFormAnswer): boolean {
    const nextSurvey = Utils.getNext(
      this._surveys,
      formAnswer
        ? _ => _.form.id === formAnswer.form.id
        : undefined,
      ({ status }) => status === AssessmentFormStatus.New
    );

    if (!nextSurvey) {
      return false;
    }

    this.displayItem(nextSurvey);

    return true;
  }

  protected _goToNextProject(): boolean {
    this._showNextProject.emit(this._list);

    return true;
  }
}
