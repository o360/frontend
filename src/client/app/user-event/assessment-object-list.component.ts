import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssessmentFormStatus, AssessmentModel, IFormAnswer } from '../core/models/assessment-model';
import { UserModel } from '../core/models/user-model';

export declare type AssessmentObject = AssessmentModel | IFormAnswer;

export class UserAssessmentFilters {
  public static readonly All = 'all';
  public static readonly NotAnswered = 'notAnswered';
  public static readonly Answered = 'answered';
}

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-object-list',
  templateUrl: 'assessment-object-list.component.html',
  styleUrls: ['assessment-object-list.component.css'],
})
export class AssessmentObjectListComponent implements OnInit {
  private _usersFilterType: string = UserAssessmentFilters.All;
  private _filters = Object.values(UserAssessmentFilters);

  private _list: AssessmentModel[];
  private _users: AssessmentModel[];
  private _filteredUsers: AssessmentModel[];
  private _selectedItem: AssessmentObject;
  private _surveys: AssessmentModel[];
  private _selectedItemChange: EventEmitter<AssessmentObject> = new EventEmitter<AssessmentObject>();

  @Input()
  public set list(value: AssessmentModel[]) {
    this._list = value;
    this._surveys = this._list.filter(x => !x.user);
    this._setUsers();
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

  public get surveys(): AssessmentModel[] {
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

  public ngOnInit() {
    this._setStinkySidebar();
  }

  public selectUser(user: AssessmentModel) {
    if (this._selectedItem !== user) {
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
      && (<AssessmentModel>this._selectedItem).user.id === userObj.id;
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

    this._users = this._list.filter(condition);
    this._filteredUsers = this._users;
  }

  private _setStinkySidebar() {
    let sidebar = document.getElementById('sidebar-container');
    let width = sidebar.offsetWidth;
    let stop = (sidebar.offsetTop - 75);

    window.onscroll = () => {
      let scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (<Element>document.documentElement || <Element>document.body.parentNode || <Element>document.body).scrollTop;

      if (scrollTop > stop) {
        if (scrollTop < 105) {
          sidebar.className = '';
        } else {
          sidebar.className = 'sticky';
          sidebar.style.width = `${width}px`;
        }
      } else {
        sidebar.className = '';
      }
    };
  }
}
