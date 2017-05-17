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
  private _selectedTemplate: ModelId[] = [];
  private _availableKinds: string[] = Object.values(EmailKind);
  private _selectedKind: string = '';
  private _kind: string = 'null';
  private _recipient: string = 'null';
  private _modal: ModalDirective;
  private _parent: ProjectModel;
  private _emailTemplatesAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();

  public get availableKinds(): string[] {
    return this._availableKinds;
  }

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

  @Output()
  public get emailTemplatesAdded(): EventEmitter<ModelId[]> {
    return this._emailTemplatesAdded;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public get availableTemplates(): EmailTemplateModel[] {
    return this._availableTemplates;
  }

  public get selectedTemplate(): ModelId[] {
    return this._selectedTemplate;
  }

  public set selectedTemplate(value: ModelId[]) {
    this._selectedTemplate = value;
  }

  public get selectedKind(): string {
    return this._selectedKind;
  }

  public set selectedKind(value: string) {
    this._selectedKind = value;
  }

  constructor(protected _emailTemplateService: EmailTemplateService,
              protected _projectService: ProjectService,
              protected _notificationService: NotificationService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      this._load();
    }

    if (changes['kind']) {
      this._load();
      console.log('Я сделяль');
    }
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    console.log(this._selectedKind);
    console.log(this._selectedTemplate);
    let transaction = this._projectService.addTemplate(this._parent, this._selectedTemplate);
    Observable.forkJoin(transaction).subscribe(() => {
      this._load();
       this._emailTemplatesAdded.emit(this._selectedTemplate);
      this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
    });
  }

  protected _load() {
    console.log(this._selectedKind);
    // let allQueryParams = { recipient: this._recipient, kind: this.selectedKind };
    let allQueryParams = { recipient: this._recipient };


    this._emailTemplateService.list(allQueryParams).subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._availableTemplates = list.data;
      // this._preBeginTemplates = list.data.filter(function (item) {
      //   return item.kind === EmailKind.preBegin;
      // });
    });
  }
}
