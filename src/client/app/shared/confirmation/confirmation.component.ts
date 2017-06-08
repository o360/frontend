import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'bs-confirmation-modal',
  templateUrl: 'confirmation.component.html'
})
export class ConfirmationModalComponent implements OnChanges, OnInit {
  protected _message: string;
  protected _conflicts: any;
  protected _confirmed: any;
  protected _modal: ModalDirective;
  protected _conflictKeys: string[];
  protected _confirm: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public set message(value: string) {
    this._message = value;
  }

  @Input()
  public set conflicts(value: any) {
    this._conflicts = value;
  }

  @Input()
  public set confirmed(value: any) {
    this._confirmed = value;
  }

  public get message(): string {
    return this._message;
  }

  public get conflicts(): any {
    return this._conflicts;
  }

  @Output()
  public get confirm(): EventEmitter<void> {
    return this._confirm;
  }

  public get conflictKeys(): any {
    return this._conflictKeys;
  }

  public get modal(): ModalDirective {
    return this._modal;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this._conflicts) {
      this._conflictKeys = Object.keys(this._conflicts);
    }
  }

  public ngOnInit() {
    if (this._modal) {
      console.log('ngOnInit', this._modal);
    }
  }

  public show() {
    if (this._modal) {
      this._modal.show();
    }
  }

  public submit() {
    this._confirm.emit();
  }
}
