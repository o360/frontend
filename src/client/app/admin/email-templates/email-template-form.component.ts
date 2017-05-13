import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { EmailKind, Recipient, EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  moduleId: module.id,
  selector: 'bs-template-form',
  templateUrl: 'email-template-form.component.html'
})
export class EmailTemplateFormComponent extends FormComponent<EmailTemplateModel> {
  protected _kinds: string[] = Object.values(EmailKind);
  protected _recipients: string[] = Object.values(Recipient);
  protected _returnPath = ['/admin/templates'];

  public get kinds(): string[] {
    return this._kinds;
  }

  public get recipients(): string[] {
    return this._recipients;
  }

  constructor(service: EmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService) {
    super(service, router, route, notificationService);
  }

  public addRecipient(textearea: HTMLTextAreaElement) {
    if (textearea.selectionStart || textearea.selectionStart === 0) {
      let newText = '%USERNAME%';
      let startPos = textearea.selectionStart;
      let endPos = textearea.selectionEnd;
      let text = textearea.value;
      let before = text.substring(0, startPos);
      let after = text.substring(endPos, text.length);
      textearea.value = (before + ' ' + newText + after);
      textearea.selectionStart = textearea.selectionEnd = startPos + newText.length + 1;
      textearea.focus();
    }
  }
}
