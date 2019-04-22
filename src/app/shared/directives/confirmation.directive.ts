import { Directive, EventEmitter, HostListener, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConfirmationService } from '../../core/services/confirmation.service';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  private _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<any> = new EventEmitter<any>();
  protected _contentTemplate: TemplateRef<any>;

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
  public clickHandler() {
    this._confirmationService.setViewContainerRef(this._viewContainerRef);
    this._confirmationService.loadTemplate(this._contentTemplate);

    this._confirmationService.loadComponent(this._message, null).subscribe((value) => {
      if (value) {
        this._confirm.emit();
      }
    });
  }
}
