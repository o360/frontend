import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssessmentFormStatus, AssessmentModel, IFormAnswer } from '../core/models/assessment-model';
import { UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { ModelId } from '../core/models/model';
import { AssessmentFormService } from '../core/services/assessment-form.service';

export declare type AssessmentObject = AssessmentModel | IFormAnswer;

export class UserAssessmentFilters {
  public static readonly All = 'all';
  public static readonly NotAnswered = 'notAnswered';
  public static readonly Answered = 'answered';
}

@Component({
  selector: 'bs-assessment-object-list',
  templateUrl: 'assessment-object-list.component.html',
  styleUrls: ['assessment-object-list.component.scss'],
})
export class AssessmentObjectListComponent {
  private static _idSeq = 0;
  private _index: number = AssessmentObjectListComponent.next();
  private _usersFilterType: string = UserAssessmentFilters.All;
  private _filters = Object.values(UserAssessmentFilters);
  private _list: AssessmentModel[];
  private _users: AssessmentModel[];
  private _filteredUsers: AssessmentModel[];
  private _selectedItem: AssessmentObject;
  private _surveys: IFormAnswer[];
  private _selectedItemChange: EventEmitter<AssessmentObject> = new EventEmitter<AssessmentObject>();

  private static next() {
    return AssessmentObjectListComponent._idSeq++;
  }

  public get index(): number {
    return this._index;
  }

  @Input()
  public set list(value: AssessmentModel[]) {
    this._list = value;
    this._setUsers();
  }

  @Input()
  public set users(value: AssessmentModel[]) {
    this._users = value;
    this._setUsers();
  }

  @Input()
  public set surveys(value: IFormAnswer[]) {
    this._surveys = value;
  }

  @Input()
  public set selectedItem(value: AssessmentObject) {
    this._selectedItem = value;
  }

  public get users(): AssessmentModel[] {
    return this._users;
  }

  public get filteredUsers(): AssessmentModel[] {
    return this._filteredUsers;
  }

  public get surveys(): IFormAnswer[] {
    return this._surveys;
  }

  public get selectedItem(): AssessmentObject {
    return this._selectedItem;
  }

  @Output()
  public get selectedItemChange(): EventEmitter<AssessmentObject> {
    return this._selectedItemChange;
  }

  public get assessmentFormStatus() {
    return AssessmentFormStatus;
  }

  public get usersFilterType(): string {
    return this._usersFilterType;
  }

  public set usersFilterType(value: string) {
    this._usersFilterType = value;
    this._setUsers();
  }

  public get filters() {
    return this._filters;
  }

  public get currentUserId(): ModelId {
    return this._authService.user.id;
  }

  constructor(private _authService: AuthService,
              private _assessmentFormService: AssessmentFormService) {
  }

  public selectUser(user: AssessmentModel) {
    if (this._selectedItem !== user) {
      if (!this._assessmentFormService.answersAreEqual) {
        this._assessmentFormService.reset();
      }
      this._selectedItem = user;
      this._selectedItemChange.emit(user);
    }
  }

  public selectSurvey(survey: IFormAnswer) {
    if (this._selectedItem !== survey) {
      this._selectedItem = survey;
      this._selectedItemChange.emit(survey);
    }
  }

  public userSearch(searchUser: AssessmentModel[]) {
    this._filteredUsers = searchUser;
  }

  public isCurrent(userObj: UserModel) {
    return !!this._selectedItem && this._selectedItem.hasOwnProperty('user')
      && (<AssessmentModel> this._selectedItem).user.id === userObj.id;
  }

  private _setUsers() {
    let condition;
    switch (this._usersFilterType) {
      case UserAssessmentFilters.Answered: {
        condition = (_: AssessmentModel) => _.user && _.isAnswered;
        break;
      }
      case UserAssessmentFilters.NotAnswered: {
        condition = (_: AssessmentModel) => _.user && !_.isAnswered;
        break;
      }
      case UserAssessmentFilters.All: {
        condition = (_: AssessmentModel) => _.user;
        break;
      }
    }

    if (this._users) {
      this._filteredUsers = this._users.filter(condition);
    }
  }
}
