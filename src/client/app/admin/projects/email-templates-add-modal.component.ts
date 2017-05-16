import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProjectService } from '../../core/services/project.service';
import { RelationService } from '../../core/services/relation.service';
import { IListResponse } from '../../core/services/rest.service';
import { EmailKind, EmailTemplateModel } from '../../core/models/email-template-model';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../../core/models/model';
import { UserModel } from '../../core/models/user-model';
import { ProjectModel } from '../../core/models/project-model';

@Component({
  moduleId: module.id,
  selector: 'bs-email-templates-add-modal',
  templateUrl: 'email-templates-add-modal.component.html'
})
export class EmailTemplateAddModalComponent implements OnChanges {
  protected _emailTemplates: EmailTemplateModel[];
  private _availableTemplates: EmailTemplateModel[];
  private _preBeginTemplates: EmailTemplateModel[];
  private _beginTemplates: EmailTemplateModel[];
  private _endTemplates: EmailTemplateModel[];
  private _preEndTemplates: EmailTemplateModel[];
  private _preBeginSelectedTemplate: ModelId[] = [];
  private _endSelectedTemplate: ModelId[] = [];
  private _kind: string = 'null';
  private _recipient: string = 'null';
  private _modal: ModalDirective;
  private _parent: ProjectModel;

  public get emailTemplates(): EmailTemplateModel[] {
    return this._emailTemplates;
  }

  @Input()
  public set parent(value: string) {
    this._parent = value;
  }

  @Input()
  public set kind(value: string) {
    this._kind = value;
  }

  @Input()
  public set recipient(value: string) {
    this._recipient = value;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public get availableTemplates(): EmailTemplateModel[] {
    return this._availableTemplates;
  }

  public get preBeginTemplates(): EmailTemplateModel[] {
    return this._preBeginTemplates;
  }

  public get beginTemplates(): EmailTemplateModel[] {
    return this._beginTemplates;
  }

  public get endTemplates(): EmailTemplateModel[] {
    return this._endTemplates;
  }

  public get preEndTemplates(): EmailTemplateModel[] {
    return this._preEndTemplates;
  }

  public get preBeginSelectedTemplate(): ModelId[] {
    return this._preBeginSelectedTemplate;
  }

  public set preBeginSelectedTemplate(value: ModelId[]) {
    this._preBeginSelectedTemplate = value;
  }

  public get endSelectedTemplate(): ModelId[] {
    return this._endSelectedTemplate;
  }

  public set endSelectedTemplate(value: ModelId[]) {
    this._endSelectedTemplate = value;
  }


  constructor(protected _emailTemplateService: EmailTemplateService,
              protected _projectService: ProjectService,
              protected _notificationService: NotificationService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      this._load();
    }
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit(type: string) {
    let template = (type === 'preBegin') ? this._preBeginSelectedTemplate : this._endSelectedTemplate;
    let transaction = this._projectService.addTemplate(this._parent, template);
    Observable.forkJoin(transaction).subscribe(() => {
      this._load();
      this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
    });
  }

  protected _load() {
    let allQueryParams = { recipient: this._recipient };

    this._emailTemplateService.list(allQueryParams).subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._availableTemplates = list.data;
      this._preBeginTemplates = list.data.filter(function (item) {
        return item.kind === EmailKind.preBegin;
      });
      this._beginTemplates = list.data.filter(function (item) {
        return item.kind === EmailKind.begin;
      });
      this._preEndTemplates = list.data.filter(function (item) {
        return item.kind === EmailKind.preEnd;
      });
      this._endTemplates = list.data.filter(function (item) {
        return item.kind === EmailKind.end;
      });
    });
  }
}
