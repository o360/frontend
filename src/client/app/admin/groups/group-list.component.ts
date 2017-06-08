import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';
import { Filter, FilterType } from '../../core/models/filter';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit, OnChanges {
  protected _filters: Filter[] = [{
    name: 'T_GROUP_NAME',
    field: 'name',
    type: FilterType.String,
    values: Object.values(GroupModel.name).map(x => ({ value: x }))
  }];

  protected _parentId: string = 'null';
  protected _innerGroupState: boolean = false;
  private _hasInnerGroup: boolean = false;

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  @Output()
  public get innerGroupState(): boolean {
    return this._innerGroupState;
  }

  constructor(service: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.parentId = this._parentId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      Object.assign(this._queryParams, { parentId: this._parentId });
      this._update();
    }
  }

  public changeInnerGroupState() {
    return this._innerGroupState = !this._innerGroupState;
  }
}
