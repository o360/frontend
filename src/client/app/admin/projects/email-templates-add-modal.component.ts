import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProjectService } from '../../core/services/project.service';
import { RelationService } from '../../core/services/relation.service';
import { IListResponse } from '../../core/services/rest.service';
import { EmailTemplateModel } from '../../core/models/email-template-model';
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
  private _kind: string = 'null';
  private _recipient: string = 'null';
  private _modal: ModalDirective;
  private _parent: ProjectModel;
  private _emailTemplatesAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();

  public get emailTemplates(): EmailTemplateModel[] {
    return this._emailTemplates;
  }

  @Output()
  public get emailTemplatesAdded(): EventEmitter<ModelId[]> {
    return this._emailTemplatesAdded;
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

  public get selectedTemplate(): ModelId[] {
    return this._selectedTemplate;
  }

  public set selectedTemplate(value: ModelId[]) {
    this._selectedTemplate = value;
  }


  constructor(protected _emailTemplateService: EmailTemplateService,
              protected _projectService: ProjectService,
              protected _relationService: RelationService,
              protected _notificationService: NotificationService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['recipient']) {
      this._load();
    }
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    if (this._selectedTemplate.length > 0) {
      let transaction = this._selectedTemplate.map(res => this._projectService.addTemplate(this._parent, this._selectedTemplate));

      Observable.forkJoin(transaction).subscribe(() => {
        this._modal.hide();
        this._emailTemplatesAdded.emit(this._selectedTemplate);
        this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
      });
    }
  }

  public update() {
    // this._queryParams
    console.log(this._parent);
    this._projectService.list().subscribe((res: IListResponse<ProjectModel>) => {
      console.log(res.data);
      let data = res.data.find(x => x.id === this._parent.id);
      console.log(data);
      // this._meta = res.meta;
      // this._list = res.data;
    });
  }

  protected _update() {
    // let allQueryParams = { kind: this._kind, recipient: this._recipient };
    let allQueryParams = { recipient: this._recipient };
    console.log(allQueryParams);
    // console.log(this._parent.find(x => x.id === 18)));

    this._emailTemplateService.list(allQueryParams).subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._availableTemplates = list.data;
      console.log(this._availableTemplates);
      super._update();

    });

    // this._projectService.list().su
    // Observable
    //   .forkJoin(
    //     this._emailTemplateService.list(allQueryParams),
    //     // this._emailTemplateService.list(groupQueryParams)
    //   )
    //   .map(([allTemplates, projectTemplates]: IListResponse<EmailTemplateModel>[]) => {
    //   console.log(allTemplates);
    //     console.log(projectTemplates);
    //      allTemplates.data.filter(temp => !projectTemplates.find(x => x.id === temp.template.id));
    //   })
    //   .subscribe((availableTemplates: EmailTemplateModel[]) => {
    //     this._availableTemplates = availableTemplates;
    //       console.log(this._availableTemplates);
    //   });
  }
}
