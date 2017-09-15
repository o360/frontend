import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { IConflicts } from '../../core/services/confirmation.service';


@Component({
  moduleId: module.id,
  selector: 'bs-confirmation-modal',
  templateUrl: 'confirmation.component.html'
})
export class ConfirmationModalComponent implements OnInit {
  protected _message: string = 'T_CONFIRM_MESSAGE';
  protected _conflicts: IConflicts;
  protected _modal: ModalDirective;
  protected _conflictKeys: string[];
  protected _confirmed: Subject<boolean> = new Subject<boolean>();
  protected _contentTemplate: TemplateRef<any>;

  @Input()
  public set message(value: string) {
    this._message = value;
  }

  @Input()
  public set contentTemplate(value: TemplateRef<any>) {
    this._contentTemplate = value;
  }

  @Input()
  public set conflicts(value: IConflicts) {
    this._conflicts = value;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public get contentTemplate(): TemplateRef<any> {
    return this._contentTemplate;
  }

  public get confirmed(): Subject<boolean> {
    return this._confirmed;
  }

  public get message(): string {
    return this._message;
  }

  public get conflicts(): IConflicts {
    return this._conflicts;
  }

  public get conflictKeys(): any {
    return this._conflictKeys;
  }

  public get modal(): ModalDirective {
    return this._modal;
  }

  public ngOnInit() {
    if (this._conflicts) {
      this._conflictKeys = Object.keys(this._conflicts);
    }
  }

  public submit() {
    this._confirmed.next(true);
    this._modal.hide();
  }

  public hide() {
    this._modal.hide();
  }
}
