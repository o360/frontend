import { Component } from '@angular/core';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { NotificationService } from '../../core/services/notification.service';
import { ProjectService } from '../../core/services/project.service';
import { RelationService } from '../../core/services/relation.service';
import { IListResponse } from '../../core/services/rest.service';
import { EmailTemplateModel } from '../../core/models/email-template-model';

@Component({
  moduleId: module.id,
  selector: 'bs-email-templates-add-modal',
  templateUrl: 'email-templates-add-modal.component.html'
})
export class EmailTemplateAddModalComponent {
  protected _emailTemplates: EmailTemplateModel[];

  public get emailTemplates(): EmailTemplateModel[] {
    return this._emailTemplates;
  }
  constructor(protected _emailTemplateService: EmailTemplateService,
              protected _projectService: ProjectService,
              protected _relationService: RelationService,
              protected _notificationService: NotificationService) {
  }
  // public show() {
  //   this._load();
  //   this._modal.show();
  // }
  // public submit() {
  //
  // }
  //
  protected _load() {
    this._emailTemplateService.list().subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._emailTemplates = list.data;
      console.log(this._emailTemplates);
      // super._load();
    });
  }
}
