import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AssessmentModel, IElementAnswer } from '../core/models/assessment-model';
import { FormElement, FormElementType, FormModel } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { FormService } from '../core/services/form.service';
import { EventStatus } from '../core/models/event-model';
import { RequireValue } from '../admin/forms/form-builder.component';
import { UserModel } from '../core/models/user-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment-form',
  templateUrl: 'assessment-form.component.html'
})
export class AssessmentFormComponent implements OnInit, OnChanges {
  protected _id: ModelId;
  protected _user: UserModel;
  protected _form: FormModel;
  protected _answers: IElementAnswer[] = [];
  protected _queryParams: IQueryParams = {};
  protected _formChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _formSave: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _inline: boolean = false;
  protected _canRevote: boolean;
  protected _isAnswered: boolean = false;
  protected _canBeAnonymous: boolean = false;
  protected _isAnonymous: boolean = false;
  protected _status: string;
  protected _assessment: AssessmentModel;
  protected _cleared: number;

  public get id(): ModelId {
    return this._id;
  }

  @Input()
  public set id(value: ModelId) {
    this._id = value;
  }

  @Input()
  public set user(value: UserModel) {
    this._user = value;
  }

  public get user(): UserModel {
    return this._user;
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

  @Output()
  public get formChange(): EventEmitter<AssessmentModel> {
    return this._formChange;
  }

  @Output()
  public get formSave(): EventEmitter<AssessmentModel> {
    return this._formSave;
  }

  public get status(): string {
    return this._status;
  }

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  @Input()
  public set cleared(value: number) {
    this._cleared = value;
  }

  @Input()
  public set inline(value: boolean | string) {
    this._inline = typeof value === 'boolean' ? value : true;
  }

  public get inline(): boolean | string {
    return this._inline;
  }

  public get canRevote(): boolean {
    return this._canRevote;
  }

  @Input()
  public set canRevote(value: boolean) {
    this._canRevote = value;
  }

  public get assessment(): AssessmentModel {
    return this._assessment;
  }

  public get isAnswered(): boolean {
    return this._isAnswered;
  }

  @Input()
  public set isAnswered(value: boolean) {
    this._isAnswered = value;
  }

  public get isAnonymous(): boolean {
    return this._isAnonymous;
  }

  public set isAnonymous(value: boolean) {
    this._isAnonymous = value;
  }

  public get canBeAnonymous(): boolean {
    return this._canBeAnonymous;
  }

  @Input()
  public set canBeAnonymous(value: boolean) {
    this._canBeAnonymous = value;

    if (value) {
      this._isAnonymous = true;
    }
  }

  constructor(protected _assessmentService: AssessmentService,
              protected _formUsersService: FormService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this._update();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleared']) {
      this._clearInlineForm();
    }
  }

  public onFormChange() {
    let answers = this._form.elements.map((element: FormElement) => {
      let elementAnswer: IElementAnswer = { elementId: element.id };
      if (!RequireValue(element.kind) && element.tempValue) {
        if (element.kind === FormElementType.LikeDislike && element.tempValue.valuesIds) {
          if (!element.tempValue.valuesIds.length) {
            elementAnswer.valuesIds = [];
            element.tempValue.text = null;
            elementAnswer.text = null;
          } else {
            elementAnswer.valuesIds = [+element.tempValue.valuesIds];
            if (element.tempValue.text) {
              elementAnswer.text = element.tempValue.text.toString();
            }
          }
        } else {
          elementAnswer.text = element.tempValue;
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

    this._assessment = new AssessmentModel({
      form: {
        formId: this._id,
        answers: answers.filter(x => (!!x.valuesIds || !!x.text)),
        isAnonymous: this._isAnonymous
      },
      isAnswered: true
    });

    if (this._user && this._assessment) {
      this._assessment.userId = this._user.id;
    }
    this._formChange.emit(this._assessment);
  }

  public save() {
    this._assessmentService.save(this._assessment, this._queryParams).subscribe(() => {
      this._notificationService.success('T_SUCCESS_SAVED');
      this._formSave.emit();
      this._isAnswered = true;
    });
  }

  protected _getAnswers() {
    this._assessmentService.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      let list = res.data;
      let currentForm;

      if (this._user) {
        currentForm = list.find(x => x.user && x.user.id === this._user.id).forms.find(x => x.form.id === this._form.id);
      } else {
        currentForm = list.filter(x => !x.user)
          .reduce((acc, item) => acc.concat(item.forms), [])
          .find(x => x.form.id === this._form.id);
      }

      if (currentForm) {
        this._answers = currentForm.answers;
      }

      if (this._answers) {
        this._answers.forEach(answer => {
          let element = this._form.elements.find(x => x.id === answer.elementId);

          if (!RequireValue(element.kind)) {
            if (element.kind === FormElementType.LikeDislike) {
              element.tempValue = {};
              if (answer && answer.valuesIds) {
                element.tempValue.valuesIds = answer.valuesIds;
                if (answer.text) {
                  element.tempValue.text = answer.text;
                }
              } else {
                element.tempValue.valuesIds = [];
              }
            } else {
              element.tempValue = answer.text;
            }
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

  protected _clearInlineForm() {
    if (this._form) {
      this._assessment = new AssessmentModel({ form: {} });
      this._assessment.form.formId = this._id;
      this._assessment.isAnswered = false;

      this._form.elements.forEach(element => {
          if (element.tempValue) {
            if (element.kind === FormElementType.LikeDislike) {
              element.tempValue.elementId = element.id;
              element.tempValue.valuesIds = [];
              element.tempValue.text = null;

              this._assessment.form.answers = [element.tempValue];
            } else {
              element.tempValue = null;
              this._assessment.form.answers = [];
            }
          } else {
            if (element.kind === FormElementType.Checkboxgroup) {
              element.values.forEach(v => v.tempValue = false);
              this._assessment.form.answers = [];
            }

            if (this._user && this._assessment) {
              this._assessment.userId = this._user.id;
            }

            this._formChange.emit(this._assessment);
          }
        }
      );
    }
  }

  protected _update(): void {
    this._formUsersService.get(this._id, this._queryParams).subscribe((form: FormModel) => {
      this._form = form;

      this._getAnswers();
    });
  }
}
