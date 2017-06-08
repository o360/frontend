import { Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from '../../core/services/confirmation.service';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  protected _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<any> = new EventEmitter<any>()

  @Input()
  public set message(value: any) {
    this._message = value;
  }

  @Output()
  public get confirm(): EventEmitter<any> {
    return this._confirm;
  }

  constructor(protected _viewContainerRef: ViewContainerRef,
              protected _translateService: TranslateService,
              protected _confirmationService: ConfirmationService) {
  }

  @HostListener('click', ['$event'])
  public clickHandler() {
    let translatedMessage = this._translateService.instant(this._message);
    this._confirmationService.container = this._viewContainerRef;
    this._confirmationService.loadComponent(translatedMessage);
  }
}
