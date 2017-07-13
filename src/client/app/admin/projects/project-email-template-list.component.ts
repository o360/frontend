import { Component, Input } from '@angular/core';
import { ModelId } from '../../core/models/model';
import { IEmailTemplate, ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../core/services/notification.service';
import { Recipient } from '../../core/models/email-template-model';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-project-email-template-list',
  templateUrl: 'project-email-template-list.component.html'
})
export class ProjectEmailTemplatesListComponent extends ListComponent<ProjectModel> {
  private _model: ProjectModel;
  private _recipient: string = Recipient.auditor;

  public get model(): ProjectModel {
    return this._model;
  }

  @Input()
  public set model(value: ProjectModel) {
    this._model = value;
  }

  @Input()
  public set recipient(value: string) {
    this._recipient = value;
  }

  public get recipient(): string {
    return this._recipient;
  }


  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'project-templates';
  }

  public emailTemplateAdded(template: IEmailTemplate) {
    let model = new ProjectModel(JSON.parse(this._model.toJson()));
    model.templates.push(template);

    this._service.save(model).subscribe(model => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
    });
  }

  public removeTemplate(templateId: ModelId) {
    this._model.templates = this._model.templates.filter(x => x.templateId !== templateId);
    this._service.save(this._model).subscribe(model => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_REMOVE_FROM_PROJECT');
    });
  }
}
