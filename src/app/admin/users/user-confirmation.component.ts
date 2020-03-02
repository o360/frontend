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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { AdminGroupService, IDataRequestUserGroups } from '../../core/services/admin-group.service';
import { IQueryParams } from '../../core/services/rest.service';
import { GroupModel } from '../../core/models/group-model';
import { NotificationService } from '../../core/services/notification.service';
import { IEntity } from '../../core/services/confirmation.service';
import { AdminUserService } from '../../core/services/admin-user.service';

@Component({
  selector: 'bs-user-confirmation',
  templateUrl: 'user-confirmation.component.html'
})
export class AdminUserConfirmationComponent implements OnInit, OnDestroy {
  protected readonly _maxCountOfGroups = 1000;
  protected _queryParams: IQueryParams;
  protected _userId: ModelId;
  protected _list: GroupModel[];
  protected _isProcessing: boolean = false;
  protected _destroy$: Subject<boolean> = new Subject();

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  public get userId(): ModelId {
    return this._userId;
  }

  public get list(): GroupModel[] {
    return this._list;
  }

  public get isProcessing(): boolean {
    return this._isProcessing;
  }

  public get isLoaded() {
    return Array.isArray(this._list);
  }

  constructor(protected _service: AdminGroupService,
              protected _router: Router,
              protected _notificationService: NotificationService,
              protected _groupService: AdminGroupService,
              protected _userService: AdminUserService) {
  }

  public ngOnInit() {
    this._loadLinkedGroups();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public deleteFromAllGroup() {
    if (this._isProcessing) {
      return;
    }

    this._isProcessing = true;

    const requestData: IDataRequestUserGroups[] = this._list
      .map(({ id }: IEntity) => ({ groupId: id, userId: this._userId }));

    this._groupService.removeUserFromAllGroup(requestData)
      .pipe(
        switchMap(() => this._userService.delete(this._userId)),
        switchMap(() => this._router.navigate(['/users'], { skipLocationChange: true })),
        switchMap(() => this._router.navigate(['/admin/users'])),
        finalize(() => this._isProcessing = false),
      )
      .subscribe(() => this._notificationService.success('T_SUCCESS_DELETED_USER_FROM_GROUPS'));
  }

  protected _loadLinkedGroups(): void {
    this._service.list({ number: 1, size: this._maxCountOfGroups, userId: this._userId })
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this._list = res.data);
  }
}
