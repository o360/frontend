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

import { Component, Input } from '@angular/core';
import { ModelId } from '../../core/models/model';
import { IEmailTemplate, ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { NotificationService } from '../../core/services/notification.service';
import { Recipient } from '../../core/models/email-template-model';
import { ListComponentDirective } from '../../shared/components/list-component.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bs-project-email-template-list',
  templateUrl: 'project-email-template-list.component.html'
})
export class AdminProjectEmailTemplatesListComponent extends ListComponentDirective<ProjectModel> {
  private _model: ProjectModel;
  private _recipient: string = Recipient.auditor;
  private _hasInProgressEvents: boolean;

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

  @Input()
  public set hasInProgressEvents(value: boolean) {
    this._hasInProgressEvents = value;
  }

  public get recipient(): string {
    return this._recipient;
  }

  public get hasInProgressEvents(): boolean {
    return this._hasInProgressEvents;
  }

  constructor(service: AdminProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'project-templates';
  }

  public emailTemplateAdded(template: IEmailTemplate) {
    let model = new ProjectModel(this._model.toJson());
    model.templates.push(template);

    this._service.save(model).subscribe((model) => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_ADDED_TO_PROJECT');
    });
  }

  public removeTemplate(templateId: ModelId) {
    this._model.templates = this._model.templates.filter(x => x.templateId !== templateId);
    this._service.save(this._model).subscribe((model) => {
      this._model.templates = model.templates;
      this._notificationService.success('T_EMAIL_TEMPLATE_REMOVE_FROM_PROJECT');
    });
  }
}
