import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { EmailKind, Recipient, EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { CKEditorComponent } from 'ng2-ckeditor';


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

  public ckEditorConfig: Object = {
    toolbarGroups: [
      { name: 'basicstyles' },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { name: 'textConstants' },
      { name: 'colors' },
      '/',
      { name: 'styles', groups: ['Styles', 'Format'] },
    ]
  };

  constructor(service: EmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService) {
    super(service, router, route, notificationService);
  }

  public addText(editorArea: CKEditorComponent, text: string) {
    editorArea.instance.insertText('{{ ' + text + ' }}');
  }
}
