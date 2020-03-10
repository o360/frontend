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

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormElement } from '../core/models/form-model';
import { ModalDirective } from '../shared/components/modal/modal.directive';
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

  @ViewChild('commentModal', { static: true })
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
