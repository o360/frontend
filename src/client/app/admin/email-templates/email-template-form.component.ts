import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormComponent } from '../../shared/components/form.component';


@Component({
  moduleId: module.id,
  selector: 'bs-template-form',
  templateUrl: 'email-template-form.component.html'
})
export class EmailTemplateFormComponent extends FormComponent<EmailTemplateModel> implements OnInit {
  protected _kinds: string[] = Object.values(EmailKind);
  protected _recipients: string[] = Object.values(Recipient);
  protected _returnPath = ['/admin/templates'];
  protected _emailParameters = [{
    label: 'T_EMAIL_TEMPLATE_ADD_RECIPIENT',
    name: 'addRecipient',
    click: 'user_name',
    command: 'insert_name'
  }, {
    label: 'T_EMAIL_TEMPLATE_ADD_EVENT_START',
    name: 'addEventStart',
    click: 'event_start',
    command: 'addEventStart'
  }, {
    label: 'T_EMAIL_TEMPLATE_ADD_EVENT_END',
    name: 'addEventEnd',
    click: 'event_end',
    command: 'addEventEnd'
  }, {
    label: 'T_EMAIL_TEMPLATE_ADD_EVENT_DESCRIPTION',
    name: 'addEventDescription',
    click: 'event_description',
    command: 'addEventDescription'
  }];

  private _ckEditorConfig: any = {
    toolbarGroups: [
      { name: 'basicstyles' },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { name: 'colors' },
      { name: 'styles', groups: ['Styles', 'Format'] },
      '/',
      { name: 'textConstants' },
    ],
  };

  public get kinds(): string[] {
    return this._kinds;
  }

  public get recipients(): string[] {
    return this._recipients;
  }

  public get emailParameters(): any {
    return this._emailParameters;
  }

  public get ckEditorConfig(): Object {
    return this._ckEditorConfig;
  }

  constructor(service: EmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              protected _translateService: TranslateService) {
    super(service, router, route, notificationService);
  }

  public ngOnInit() {
    this._ckEditorConfig.language = this._translateService.currentLang;
    super.ngOnInit();
  }

  public addText(editorArea: CKEditorComponent, text: string) {
    editorArea.instance.insertText('{{ ' + text + ' }}');
  }
}
