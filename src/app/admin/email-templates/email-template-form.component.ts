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

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ɵa as CKEditorComponent } from 'ng2-ckeditor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { AdminEmailTemplateService } from '../../core/services/admin-email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormComponent } from '../../shared/components/form.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-template-form',
  templateUrl: 'email-template-form.component.html'
})
export class AdminEmailTemplateFormComponent extends FormComponent<EmailTemplateModel> implements OnInit, OnDestroy {
  protected _returnPath: any[] = ['/admin/templates'];

  private _kinds: string[] = Object.values(EmailKind);
  private _recipients: string[] = Object.values(Recipient);
  private _emailParameters = [{
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
  private _destroy$: Subject<boolean> = new Subject();
  private _editorConfigReady: boolean = false;

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

  public get editorConfigReady(): boolean {
    return this._editorConfigReady;
  }

  constructor(service: AdminEmailTemplateService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              private _translateService: TranslateService,
              private _cdr: ChangeDetectorRef) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public ngOnInit() {
    this._setCkEditorLanguage(this._translateService.currentLang);
    this._initLanguageChangeWatch();

    super.ngOnInit();
  }

  public ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public addText(editorArea: CKEditorComponent, text: string) {
    editorArea.instance.insertText(`{{ ${text} }}`);
  }

  protected _setModelName(model: EmailTemplateModel) {
    this._modelName = model.name;
  }

  private _initLanguageChangeWatch(): void {
    this._translateService.onLangChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ lang }: LangChangeEvent) => this._setCkEditorLanguage(lang));
  }

  private _setCkEditorLanguage(lang: string) {
    this._editorConfigReady = false;
    this._cdr.detectChanges();
    this._ckEditorConfig.language = lang;
    this._editorConfigReady = true;
    this._cdr.markForCheck();
  }
}
