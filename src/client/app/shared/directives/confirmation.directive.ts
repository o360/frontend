import { Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { ModelId } from '../../core/models/model';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  private _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<any> = new EventEmitter<any>();
  private _userId: ModelId;

  @Output()
  public get confirm(): EventEmitter<any> {
    return this._confirm;
  }

  @Input()
  public set message(value: string) {
    this._message = value;
  }

  @Input('bsConfirm')
  public set userId(value: ModelId) {
    this._userId = value;
  }

  constructor(protected _viewContainerRef: ViewContainerRef,
              protected _confirmationService: ConfirmationService) {
  }

  @HostListener('click', ['$event'])
  public clickHandler() {
    this._confirmationService.setViewContainerRef(this._viewContainerRef);
    this._confirmationService.setUserId(this._userId);

    this._confirmationService.loadComponent(this._message , null).subscribe(value => {
      if (value) {
        this._confirm.emit();
      }
    });

  }
}
