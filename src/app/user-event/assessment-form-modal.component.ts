import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormElement } from '../core/models/form-model';
import { IComment } from './assessment-form.component';

@Component({
  selector: 'bs-assessment-form-modal',
  templateUrl: 'assessment-form-modal.component.html'
})
export class AssessmentFormModalComponent {
  protected _modal: ModalDirective;
  protected _commentItem: IComment = { formElementId: undefined, text: '' };
  protected _onCommentAdded: EventEmitter<IComment> = new EventEmitter<IComment>();
  protected _currentComment: string;

  @ViewChild('commentModal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public set commentItem(value: IComment) {
    this._commentItem = value;
  }

  @Output()
  public get onCommentAdded(): EventEmitter<IComment> {
    return this._onCommentAdded;
  }

  public get commentItem(): IComment {
    return this._commentItem;
  }

  public get currentComment(): string {
    return this._currentComment;
  }

  public show(item: FormElement) {
    this._currentComment = item.tempComment ? item.tempComment : '';
    this._commentItem = { formElementId: item.id, text: item.tempComment ? item.tempComment : '' };
    this._modal.show();
  }

  public addComment() {
    this._onCommentAdded.emit(this._commentItem);
    this._modal.hide();
  }
}
