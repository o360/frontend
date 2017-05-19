import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { IEmailTemplate } from '../../core/models/project-model';
import { EmailTemplateService } from '../../core/services/email-template.service';

@Component({
  moduleId: module.id,
  selector: 'bs-email-templates-add-modal',
  templateUrl: 'email-templates-add-modal.component.html'
})
export class EmailTemplateAddModalComponent {
  private _modal: ModalDirective;
  private _kinds: string[] = Object.values(EmailKind);
  private _emailTemplates: EmailTemplateModel[];
  private _availableTemplates: EmailTemplateModel[];
  private _usedEmailTemplates: IEmailTemplate[];
  private _recipient: string;
  private _model: IEmailTemplate = {
    kind: null,
    templateId: null,
    recipient: Recipient.auditor
  };
  private _templateAdded: EventEmitter<IEmailTemplate> = new EventEmitter<IEmailTemplate>();

  @Input()
  public set usedEmailTemplate(value: IEmailTemplate[]) {
    this._usedEmailTemplates = value;
  }

  @Input()
  public set recipient(value: string) {
    this._recipient = value;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public get model(): IEmailTemplate {
    return this._model;
  }

  public set model(value: IEmailTemplate) {
    this._model = value;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get availableTemplates(): EmailTemplateModel[] {
    return this._availableTemplates;
  }

  @Output()
  public get templateAdded(): EventEmitter<IEmailTemplate> {
    return this._templateAdded;
  }

  constructor(protected _emailTemplateService: EmailTemplateService) {
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public updateTemplatesList() {
    this._availableTemplates = this._emailTemplates.filter(template => {
      return template.kind === this._model.kind &&
        template.recipient === this._recipient &&
        !this._usedEmailTemplates.find(x => x.templateId === template.id);
    });
  }

  public submit() {
    this._templateAdded.emit(JSON.parse(JSON.stringify(this._model)));
  }

  private _load() {
    this._emailTemplateService.list().subscribe(res => {
      this._emailTemplates = res.data;
    });
  }
}
