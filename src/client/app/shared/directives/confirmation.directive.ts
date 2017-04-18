import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[bsConfirm]'
})
export class ConfirmationDirective {
  @Input()
  public message: string;

  @Output()
  public confirm: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click', ['$event']) confirmFirst() {
    const confirmed = window.confirm(this.message);

    if (confirmed) {
      this.confirm.emit();
    } else {
      this.cancel.emit();
    }
  }

}
