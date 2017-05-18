import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssessmentModel, IElementAnswer } from '../core/models/assessment-model';
import { FormElementType, FormModel, IFormElement } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { FormService } from '../core/services/form.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';

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
  private _formChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();

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

  constructor(protected _assessmentService: AssessmentService,
              protected _formService: FormService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this._update();
  }

  protected _update(): void {
    this._formService.get(this._id).subscribe((form: FormModel) => {
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
        elementAnswer.valuesIds = [];
        element.values.forEach(x => {
          if (!!x.tempValue) {
            if (x.tempValue) {
              elementAnswer.valuesIds.push(x.id);
            } else {
              let index: number = elementAnswer.valuesIds.indexOf(x.id);
              if (index !== -1) {
                elementAnswer.valuesIds.splice(index, 1);
              }
            }
          }
        });
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

      if (!!this._form) {
        if (!!this._userId) {
          let filtered = list.filter(x => x.user);
          currentForm = filtered.find(x => x.user.id === this._userId).forms.find(x => x.form.id === this._form.id);
        } else {
          currentForm = list.find(x => x === x).forms.find(x => x.form.id === this._form.id);
        }

        this._answers = currentForm.answers;
        if (!!this._answers) {
          this._answers.forEach(answer => {
            let element = this._form.elements.find(x => x.id === answer.elementId);
            if (!this.requireValue(element.kind)) {
              element.tempValue = answer.text;
            } else if (element.kind === FormElementType.Checkboxgroup) {
              if (!!answer.valuesIds) {
                answer.valuesIds.forEach(id => {
                  let value = element.values.find(x => x.id === id);
                  value.tempValue = true;
                });
              }
            } else if (!!answer.valuesIds) {
              element.tempValue = answer.valuesIds[0];
            }
          });
        }
      }
    });
  }

  public isValid(element: IFormElement) {
    if (!element.required) {
      return true;
    } else {
      return !!element.tempValue;
    }
  }
}
