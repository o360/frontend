import { Component, Input } from '@angular/core';
import { ModelId } from '../../core/models/model';
import { IEmailTemplate } from '../../core/models/project-model';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { Recipient } from '../../core/models/email-template-model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-relation-email-template-list',
  templateUrl: 'relation-email-template-list.component.html'
})
export class RelationEmailTemplatesListComponent {
  private _model: RelationModel;
  private _recipient: string = Recipient.respondent;
  private _hasInProgressEvents: boolean;

  public get model(): RelationModel {
    return this._model;
  }

  @Input()
  public set hasInProgressEvents(value: boolean) {
    this._hasInProgressEvents = value;
  }

  public get hasInProgressEvents(): boolean {
    return this._hasInProgressEvents;
  }

  @Input()
  public set model(value: RelationModel) {
    this._model = value;
  }

  @Input()
  public set recipient(value: string) {
    this._recipient = value;
  }

  public get recipient(): string {
    return this._recipient;
  }

  constructor(private _relationService: RelationService,
              private _notificationService: NotificationService) {
  }

  public emailTemplateAdded(template: IEmailTemplate) {
    let model = new RelationModel(JSON.parse(this._model.toJson()));
    model.templates.push(template);

    this._relationService.save(model).subscribe(model => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
    });
  }

  public removeTemplate(templateId: ModelId) {
    this._model.templates = this._model.templates.filter(x => x.templateId !== templateId);

    this._relationService.save(this._model).subscribe(model => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_REMOVE_FROM_PROJECT');
    });
  }
}
