import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssessmentModel, IElementAnswer } from '../core/models/assessment-model';
import { FormElementType, FormModel, IFormElement } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { FormUsersService } from '../core/services/form-users.service';
import { EventStatus } from '../core/models/event-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment-form',
  templateUrl: 'assessment-form.component.html'
})
export class UserAssessmentFormComponent implements OnInit {
  protected _id: ModelId;
  protected _userId: ModelId;
  protected _form: FormModel;
  protected _answers: IElementAnswer[] = [];
  protected _queryParams: IQueryParams = {};
  protected _formChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  private _status: string;

  public get id(): ModelId {
    return this._id;
  }

  @Input()
  public set id(value: ModelId) {
    this._id = value;
  }

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  @Input()
  public set queryParams(value: IQueryParams) {
    this._queryParams = value;
  }

  public get form(): FormModel {
    return this._form;
  }

  public get FormElementType() {
    return FormElementType;
  }

  public get EventStatus() {
    return EventStatus;
  }

  public requireValue(kind: string) {
    return [
      FormElementType.Radio,
      FormElementType.Checkboxgroup,
      FormElementType.Select
    ].includes(kind);
  }

  @Output()
  public get formChange(): EventEmitter<AssessmentModel> {
    return this._formChange;
  }

  public get status(): string {
    return this._status;
  }

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  constructor(protected _assessmentService: AssessmentService,
              protected _formUsersService: FormUsersService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this._update();
  }

  protected _update(): void {
    this._formUsersService.get(this._id, this._queryParams).subscribe((form: FormModel) => {
      this._form = form;

      this._getAnswers();
    });
  }

  public save() {
    let answers = this._form.elements.map((element: IFormElement) => {
      let elementAnswer: IElementAnswer = { elementId: element.id };

      if (!this.requireValue(element.kind)) {
        if (!!element.tempValue) {
          elementAnswer.text = element.tempValue.toString();
        }
      } else if (element.kind === FormElementType.Checkboxgroup) {
        elementAnswer.valuesIds = element.values.filter(x => x.tempValue).map(x => x.id);
      } else {
        if (!!element.tempValue) {
          elementAnswer.valuesIds = [+element.tempValue];
        }
      }

      return elementAnswer;
    });

    let answer: AssessmentModel = new AssessmentModel({
      userId: this._userId,
      form: {
        formId: this._id,
        answers: answers.filter(x => (!!x.valuesIds || !!x.text))
      },
      isAnswered: true
    });

    this._assessmentService.save(answer, this._queryParams).subscribe(() => {
      this._notificationService.success('T_SUCCESS_SAVED');
      this._formChange.emit(answer);
      this._update();
    });
  }

  protected _getAnswers() {
    this._assessmentService.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      let list = res.data;
      let currentForm;

      if (this._userId) {
        currentForm = list.find(x => x.user && x.user.id === this._userId).forms.find(x => x.form.id === this._form.id);
      } else {
        currentForm = list.filter(x => !x.user)
          .reduce((acc, item) => acc.concat(item.forms), [])
          .find(x => x.form.id === this._form.id);
      }

      this._answers = currentForm.answers;

      if (this._answers) {
        this._answers.forEach(answer => {
          let element = this._form.elements.find(x => x.id === answer.elementId);

          if (!this.requireValue(element.kind)) {
            element.tempValue = answer.text;
          } else if (element.kind === FormElementType.Checkboxgroup) {
            if (answer.valuesIds) {
              answer.valuesIds.forEach(id => {
                let value = element.values.find(x => x.id === id);
                value.tempValue = true;
              });
            }
          } else if (answer.valuesIds) {
            element.tempValue = answer.valuesIds[0];
          }
        });
      }
    });
  }
}
