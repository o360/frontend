import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { IListResponse } from '../../core/services/rest.service';
import { EmailTemplateService } from '../../core/services/email-template.service';
import { EmailKind, EmailTemplateModel, Recipient } from '../../core/models/email-template-model';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class ProjectFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _templates: EmailTemplateModel[];
  protected _kind: string = EmailKind.preBegin;
  protected _recipient: string = Recipient.auditor;
  private _parent: string = 'null';
  protected _returnPath = ['/admin/projects'];

  @Input()
  public set parent(value: string) {
    this._parent = value;
  }

  public get parent(): string {
    return this._parent;
  }

  public get auditors(): GroupModel[] {
    return this._auditors;
  }

  public get templates(): GroupModel[] {
    return this._templates;
  }

  public get kind(): string {
    return this._kind;
  }

  public get recipient(): string {
    return this._recipient;
  }


  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService,
              protected _emailTemplateService: EmailTemplateService) {
    super(service, router, route);
    // super(service, router, route, notificationService);
  }

  public changeKind(value: string) {
    if (value === 'preBegin') {
      return this._kind = EmailKind.preBegin;
    } else if (value === 'end') {
      return this._kind = EmailKind.end;
    }
    return this._kind = EmailKind.end;
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._auditors = list.data;
      super._load();
    });
    this._emailTemplateService.list().subscribe((list: IListResponse<EmailTemplateModel>) => {
      this._templates = list.data;
      console.log(this._templates);
      super._load();
    });
  }
}
