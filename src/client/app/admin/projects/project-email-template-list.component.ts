import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { ListComponent } from '../../shared/components/list.component';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../core/services/notification.service';
import { Observable } from 'rxjs/Observable';
import { IListResponse } from '../../core/services/rest.service';
import { template } from 'gulp-util';

@Component({
  moduleId: module.id,
  selector: 'bs-project-email-template-list',
  templateUrl: 'project-email-template-list.component.html'
})
export class ProjectEmailTemplatesListComponent extends ListComponent<EmailTemplateModel> implements OnChanges {
  private _model: ProjectModel;
  private _availableTemplates: EmailTemplateModel[];
  private _selectedTemplate: ModelId[] = [];
  protected _templates: EmailTemplateModel[];
  protected _recipient: string = Recipient.auditor;
  // public templatesTypes = [{
  //   name: 'T_PROJECT_EMAIL_TEMPLATE_KIND_PREBEGIN',
  //   kind: EmailKind.preBegin
  // }];
  protected _preBegin: any;
  protected _begin: EmailTemplateModel[];
  protected _preEnd: EmailTemplateModel[];
  protected _end: EmailTemplateModel[];
  public choosingMode: boolean = false;

  @Input()
  public set model(value: string) {
    this._model = value;
  }

  public get model(): string {
    return this._model;
  }

  // private _groupId: string = 'null';
  //
  // @Input()
  // public set groupId(value: string) {
  //   this._groupId = value;
  // }
  //
  // public get groupId(): string {
  //   return this._groupId;
  // }
  public get recipient(): string {
    return this._recipient;
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

  public get preBegin(): EmailTemplateModel[] {
    return this._preBegin;
  }

  public get begin(): EmailTemplateModel[] {
    return this._begin;
  }

  constructor(service: EmailTemplateService,
              activatedRoute: ActivatedRoute,
              router: Router,
              protected _projectService: ProjectService,
              protected _notificationService: NotificationService) {
    super(service, activatedRoute, router);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      this._queryParams = Object.assign(this._queryParams, { model: this._model });
      this._update();
    }
  }

  public changeMode() {
    return this.choosingMode = true;
  }

  public remove(model: ProjectModel, templateId: ModelId) {
    let transaction = this._projectService.removeEmailTemplate(model, templateId);

    Observable.forkJoin(transaction).subscribe(() => {
      this._notificationService.success('T_EMAIL_TEMPLATE_REMOVE_FROM_PROJECT');
    });
  }

  public emailTemplatesAdded() {
    this._update();
  }

  // public changeKind(value: string) {
  //   if (value === 'preBegin') {
  //     return this._kind = EmailKind.preBegin;
  //   } else if (value === 'end') {
  //     return this._kind = EmailKind.end;
  //   }
  //   return this._kind = EmailKind.end;
  // }
  protected _update() {
    // let allQueryParams = { recipient: this._recipient };

    this._service.list().subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._availableTemplates = list.data;
      // console.log(this._availableTemplates);
      // let b = this._availableTemplates.filter(template =>this._availableTemplates.find(x =>  x.kind === EmailKind.preBegin));
        // = this._availableTemplates.find(x =>  x.kind === EmailKind.preBegin);
      // return allUsers.data.filter(user => !groupUsers.data.find(x => x.id === user.id));
      // let b = this._availableTemplates.filter();
      console.log(this._availableTemplates.filter(template =>this._availableTemplates.find(x =>  x.kind === EmailKind.preBegin)));
      // console.log(b);
      // // this._begin
    });
    super._update();
  }

  public submit() {
    let transaction = this._projectService.addTemplate(this._model, this._selectedTemplate));
      Observable.forkJoin(transaction).subscribe(() => {
        this._update();
        this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
      });
    }
  }
}
// this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
//   this._auditors = list.data;
//   super._load();
// });
