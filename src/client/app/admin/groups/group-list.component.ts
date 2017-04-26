import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { IQueryParams } from '../../core/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit, OnChanges {
  protected _parentId: string = 'null';

  @Input()
  public set parentId(value: string) {
    this._parentId = value;

  }

  public get parentId() {
    return this._parentId;
  }


  constructor(service: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(service, activatedRoute, router);
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
}
