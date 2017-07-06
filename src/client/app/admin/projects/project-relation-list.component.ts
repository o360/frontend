import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../../shared/components/list.component';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-list',
  templateUrl: 'project-relation-list.component.html'
})
export class ProjectRelationListComponent extends ListComponent<RelationModel> implements OnInit, OnChanges {
  protected _projectId: string = 'null';
  private _hasInProgressEvents: boolean;

  @Input()
  public set projectId(value: string) {
    this._projectId = value;
  }

  public get projectId() {
    return this._projectId;
  }

  @Input()
  public set hasInProgressEvents(value: boolean) {
    this._hasInProgressEvents = value;
  }

  public get hasInProgressEvents(): boolean {
    return this._hasInProgressEvents;
  }

  constructor(service: RelationService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, { projectId: this._projectId });
      this._update();
    }
  }
}
