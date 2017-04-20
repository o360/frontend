import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  private _message: string = 'T_CONFIRM_MESSAGE';
  private _confirm: EventEmitter<void> = new EventEmitter<void>();
  private _cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public set message(value: any) {
    this._message = value;
  }

  @Output()
  public get cancel(): EventEmitter<void> {
    return this._cancel;
  }

  @Output()
  public get confirm(): EventEmitter<void> {
    return this._confirm;
  }

  constructor(protected _translateService: TranslateService) {
  }

  @HostListener('click', ['$event'])
  public clickHandler() {
    let translatedMessage = this._translateService.instant(this._message);
    const confirmed = window.confirm(translatedMessage);

    if (confirmed) {
      this._confirm.emit();
    } else {
      this._cancel.emit();
    }
  }

}
