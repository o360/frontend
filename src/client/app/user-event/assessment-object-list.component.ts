import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssessmentFormStatus, AssessmentModel, IFormAnswer } from '../core/models/assessment-model';
import { UserModel } from '../core/models/user-model';

export declare type AssessmentObject = AssessmentModel | IFormAnswer;

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-object-list',
  templateUrl: 'assessment-object-list.component.html'
})
export class AssessmentObjectListComponent {
  private _list: AssessmentModel[];
  private _users: AssessmentModel[];
  private _selectedItem: AssessmentObject;
  private _surveys: AssessmentModel[];
  private _selectedItemChange: EventEmitter<AssessmentObject> = new EventEmitter<AssessmentObject>();

  @Input()
  public set list(value: AssessmentModel[]) {
    this._list = value;
    this._users = this._list.filter(x => x.user);
    this._surveys = this._list.filter(x => !x.user);
  }

  public get users(): AssessmentModel[] {
    return this._users;
  }

  public get surveys(): AssessmentModel[] {
    return this._surveys;
  }

  public get selectedItem(): AssessmentObject {
    return this._selectedItem;
  }

  @Input()
  public set selectedItem(value: AssessmentObject) {
    this._selectedItem = value;
  }

  @Output()
  public get selectedItemChange(): EventEmitter<AssessmentObject> {
    return this._selectedItemChange;
  }

  public get assessmentFormStatus() {
    return AssessmentFormStatus;
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
    this._users = searchUser;
  }

  public isCurrent(userObj: UserModel) {
    return !!this._selectedItem && this._selectedItem.hasOwnProperty('user')
      && (<AssessmentModel>this._selectedItem).user.id === userObj.id;
  }
}
