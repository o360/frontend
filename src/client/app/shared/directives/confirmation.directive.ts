import { Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { ConfirmationService } from '../../core/services/confirmation.service';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  private _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public get confirm(): EventEmitter<any> {
    return this._confirm;
  }

  @Input()
  set message(value: string) {
    this._message = value;
  }

  constructor(protected _viewContainerRef: ViewContainerRef,
              protected _confirmationService: ConfirmationService) {
  }

  @HostListener('click', ['$event'])
  public clickHandler() {
    this._confirmationService.setViewContainerRef(this._viewContainerRef);

    this._confirmationService.loadComponent(this._message).subscribe(value => {
      if (value) {
        this._confirm.emit();
      }
    });
  }
}
