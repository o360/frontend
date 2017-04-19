import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  protected _message: string;

  @Input()
  public set message(value: any) {
    this._message = value;
  }

  @Output()
  public _confirm: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public _cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected _translateService: TranslateService) {
    this._translateService.get('T_CONFIRM_MESSAGE').subscribe((res: string) => {
      this._message = res;
    });
  }

  @HostListener('click', ['$event'])
  public clickHandler() {
    const confirmed = window.confirm(this._message);

    if (confirmed) {
      this._confirm.emit();
    } else {
      this._cancel.emit();
    }
  }

}
