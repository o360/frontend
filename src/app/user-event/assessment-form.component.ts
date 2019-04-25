import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AssessmentFormStatus, AssessmentModel, IElementAnswer } from '../core/models/assessment-model';
import { FormElement, FormElementType, FormModel } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { FormService } from '../core/services/form.service';
import { EventStatus } from '../core/models/event-model';
import { RequireValue } from '../admin/forms/form-builder.component';
import { UserModel } from '../core/models/user-model';
import { Router } from '@angular/router';
import { AssessmentFormService } from '../core/services/assessment-form.service';
import { Observable } from 'rxjs';
import { DialogService } from '../core/services/dialog.service';
import { CanDeactivateGuard } from '../core/guards/deactivate.guard';

export interface IComment {
  formElementId: ModelId;
  text: string;
}

@Component({
  selector: 'bs-user-assessment-form',
  templateUrl: 'assessment-form.component.html',
  styleUrls: ['assessment-form.component.scss'],
})
export class AssessmentFormComponent implements OnInit, OnChanges, CanDeactivateGuard {
  protected _id: ModelId;
  protected _user: UserModel;
  protected _form: FormModel;
  protected _answers: IElementAnswer[] = [];
  protected _queryParams: IQueryParams = {};
  protected _formChange: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _formSave: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  protected _inline: boolean = false;
  protected _canRevote: boolean;
  protected _formStatus: string;
  protected _status: string;
  protected _canBeAnonymous: boolean = false;
  protected _isAnonymous: boolean = false;
  protected _assessment: AssessmentModel;
  protected _cleared: number;
  protected _isLast: boolean;
  protected _inlineAnonymous: boolean;

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

  public get inlineAnonymous(): boolean {
    return this._inlineAnonymous;
  }

  @Input()
  public set inlineAnonymous(value: boolean) {
    this._inlineAnonymous = value;
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

  @Input()
  public set formStatus(value: string) {
    this._formStatus = value;
  }

  public get isAnswered(): boolean {
    return this._formStatus === AssessmentFormStatus.Answered;
  }

  public get isAnonymous(): boolean {
    return this._isAnonymous;
  }

  public set isAnonymous(value: boolean) {
    this._isAnonymous = value;
  }

  @Input()
  public set isLast(value: boolean) {
    this._isLast = value;
  }

  public get isLast(): boolean {
    return this._isLast;
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

  public get answers(): IElementAnswer[] {
    return this._answers;
  }

  constructor(protected _assessmentService: AssessmentService,
              protected _formUsersService: FormService,
              protected _notificationService: NotificationService,
              protected _router: Router,
              protected _assessmentFormService: AssessmentFormService,
              protected _dialogService: DialogService) {
  }

  public ngOnInit() {
    this._update();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleared']) {
      this._clearInlineForm();
    }
    if (changes['inlineAnonymous']) {
      if (this._isAnonymous !== this._inlineAnonymous) {
        this._isAnonymous = this._inlineAnonymous;
        this.onFormChange();
      }
    }
  }

  public onCommentAdded(value: IComment) {
    this.onFormChange(value);
  }

  public onFormChange(value?: IComment) {
    const answers = this._form.elements.map((element: FormElement) => {
      const elementAnswer: IElementAnswer = { elementId: element.id };
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
          if (element.kind === FormElementType.Checkbox) {
            elementAnswer.text = elementAnswer.text.toString();
          }
        }
      } else if (element.kind === FormElementType.Checkboxgroup) {
        elementAnswer.valuesIds = element.values.filter(x => x.tempValue).map(x => x.id);
      } else {
        if (!!element.tempValue) {
          elementAnswer.valuesIds = [+element.tempValue];
        }
      }
      if (element.tempComment) {
        elementAnswer.comment = element.tempComment;
      }
      if (value) {
        if (value.formElementId === element.id) {
          element.tempComment = value.text;
          elementAnswer.comment = element.tempComment;
        }
      }
      return elementAnswer;
    });

    this._assessment = new AssessmentModel({
      form: {
        formId: this._id,
        answers: answers.filter(x => (!!x.valuesIds || !!x.text)),
        isAnonymous: this._isAnonymous,
        isSkipped: false,
        status: AssessmentFormStatus.Answered // @TODO with skipping
      },
      isAnswered: true,
    });

    if (this._user && this._assessment) {
      this._assessment.userId = this._user.id;
    }

    this._formChange.emit(this._assessment);
    this._assessmentFormService.equals(this.answers, this.assessment.form.answers);
    console.log(this.status);
  }

  public canDeactivate(): boolean | Observable <boolean> {
    console.log('CALLL');
    if(this.status && this.status === 'inProgress') {
      console.log('SURE');
      return this._dialogService.confirm('SURE WANT DIS!?');
    }
    return true;
  }

  public save() {
    this._assessmentService.saveBulk([this._assessment], this._queryParams).subscribe(() => {
      this._formStatus = AssessmentFormStatus.Answered;
      this._formSave.emit(this._assessment);
      this._assessmentFormService.reset();

      if (this._isLast) {
        this._finish();
      } else {
        this._notificationService.success('T_SUCCESS_SAVED');
      }
    });
  }

  public clearComment() {
    this._form.elements.map(element => element.tempComment = undefined);
  }

  protected _finish() {
    this._notificationService.success('T_SUCCESS_ASSESSMENT_FINISH');
  }

  protected _getAnswers() {
    this._assessmentService.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      const list = res.data;
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
        this._answers.forEach((answer) => {
          const element = this._form.elements.find(x => x.id === answer.elementId);

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
              element.tempComment = answer.comment;
            }
          } else if (element.kind === FormElementType.Checkboxgroup) {
            if (answer.valuesIds) {
              answer.valuesIds.forEach((id) => {
                const value = element.values.find(x => x.id === id);
                value.tempValue = true;
              });
            }
            if (answer.comment) {
              element.tempComment = answer.comment;
            }
          } else if (answer.valuesIds) {
            element.tempValue = answer.valuesIds[0];
            element.tempComment = answer.comment;
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

      this._form.elements.forEach((element) => {
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
