import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { EmailKind, Recipient, EmailTemplateModel } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { TranslateService } from '@ngx-translate/core';


@Component({
  moduleId: module.id,
  selector: 'bs-template-form',
  templateUrl: 'email-template-form.component.html'
})
export class EmailTemplateFormComponent extends FormComponent<EmailTemplateModel> {
  protected _kinds: string[] = Object.values(EmailKind);
  protected _recipients: string[] = Object.values(Recipient);
  protected _returnPath = ['/admin/templates'];
  protected _emailParameters = [{
    label: this._translate('T_EMAIL_TEMPLATE_ADD_RECIPIENT'),
    name: 'addRecipient',
    click: 'user_name',
    command: 'insert_name'
  }, {
    label: this._translate('T_EMAIL_TEMPLATE_ADD_EVENT_START'),
    name: 'addEventStart',
    click: 'event_start',
    command: 'addEventStart'
  }, {
    label: this._translate('T_EMAIL_TEMPLATE_ADD_EVENT_END'),
    name: 'addEventEnd',
    click: 'event_end',
    command: 'addEventEnd'
  }, {
    label: this._translate('T_EMAIL_TEMPLATE_ADD_EVENT_DESCRIPTION'),
    name: 'addEventDescription',
    click: 'event_description',
    command: 'addEventDescription'
  },];

  public get kinds(): string[] {
    return this._kinds;
  }

  public get recipients(): string[] {
    return this._recipients;
  }

  public get emailParameters(): any {
    return this._emailParameters;
  }

  public ckEditorConfig: Object = {
    toolbarGroups: [
      { name: 'basicstyles' },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { name: 'textConstants' },
      { name: 'colors' },
      '/',
      { name: 'styles', groups: ['Styles', 'Format'] },
    ],
  };

  constructor(service: EmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              protected _translateService: TranslateService) {
    super(service, router, route, notificationService);
  }

  protected _translate(constant: string) {
    return this._translateService.instant(constant);
  }

  public addText(editorArea?: CKEditorComponent, text: string) {
    editorArea.instance.insertText('{{ ' + text + ' }}');
  }
}


