import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../../shared/components/list.component';
import { RelationModel } from '../../core/models/relation-model';
import { AdminRelationService } from '../../core/services/admin-relation.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'bs-project-relation-list',
  templateUrl: 'project-relation-list.component.html'
})
export class AdminProjectRelationListComponent extends ListComponent<RelationModel> implements OnInit, OnChanges {
  private _hasInProgressEvents: boolean;
  protected _projectId: string = 'null';

  @Input()
  public set projectId(value: string) {
    this._projectId = value;
  }

  @Input()
  public set hasInProgressEvents(value: boolean) {
    this._hasInProgressEvents = value;
  }

  public get projectId() {
    return this._projectId;
  }


  public get hasInProgressEvents(): boolean {
    return this._hasInProgressEvents;
  }

  constructor(service: AdminRelationService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'project-relations';
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, { projectId: this._projectId });
      this._update();
    }
  }
}
