/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { AdminEmailTemplateService } from '../../core/services/admin-email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormComponent } from '../../shared/components/form.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-template-form',
  templateUrl: 'email-template-form.component.html'
})
export class AdminEmailTemplateFormComponent extends FormComponent<EmailTemplateModel> implements OnInit {
  protected _kinds: string[] = Object.values(EmailKind);
  protected _recipients: string[] = Object.values(Recipient);
  protected _returnPath: any[] = ['/admin/templates'];
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

  constructor(service: AdminEmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _translateService: TranslateService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public ngOnInit() {
    this._ckEditorConfig.language = this._translateService.currentLang;
    super.ngOnInit();
  }

  public addText(editorArea: CKEditorComponent, text: string) {
    editorArea.instance.insertText(`{{ ' ${text} ' }}`);
  }
}
