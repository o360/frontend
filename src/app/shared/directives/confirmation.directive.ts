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

import { Directive, EventEmitter, HostListener, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConfirmationService } from '../../core/services/confirmation.service';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  protected _contentTemplate: TemplateRef<any>;

  private _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public set message(value: string) {
    this._message = value;
  }

  @Input()
  public set contentTemplate(value: TemplateRef<any>) {
    this._contentTemplate = value;
  }

  @Output()
  public get confirm(): EventEmitter<any> {
    return this._confirm;
  }

  constructor(protected _viewContainerRef: ViewContainerRef,
              protected _confirmationService: ConfirmationService) {
  }

  @HostListener('click', ['$event'])
  public clickHandler(event: UIEvent): void {
    event.stopPropagation();

    this._confirmationService.setViewContainerRef(this._viewContainerRef);
    this._confirmationService.loadTemplate(this._contentTemplate);

    this._confirmationService.loadComponent(this._message, null).subscribe((value) => {
      if (value) {
        this._confirm.emit();
      }
    });
  }
}
