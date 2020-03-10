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

import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';
import {
  Subject,
  Subscription,
  timer
} from 'rxjs';
import {
  concatMap,
  takeUntil
} from 'rxjs/operators';
import { ModelId } from '../core/models/model';
import { ListComponentDirective } from '../shared/components/list-component.directive';
import { EventModel, EventStatus } from '../core/models/event-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse } from '../core/services/rest.service';
import { EventService } from '../core/services/event.service';
import { Utils } from '../utils';

@Component({
  selector: 'bs-assessment-user-event-list',
  templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponentDirective<EventModel> implements OnDestroy {
  protected readonly _pollingInterval: number = Utils.seconds(5);
  protected _status: string = 'null';
  protected _destroy$: Subject<boolean> = new Subject();

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  public get status(): string {
    return this._status;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public trackById(index: number, item: EventModel): ModelId {
    return item.id;
  }

  protected _update() {
    const queryParams = { status: this._status, sort: 'start', onlyAvailable: 'true' };

    if (this._status === EventStatus.Completed) {
      queryParams.sort = 'end';
    }

    if (this._fetching instanceof Subscription && !this._fetching.closed) {
      this._fetching.unsubscribe();
    }

    this._fetching = timer(0, this._pollingInterval)
      .pipe(
        concatMap(() => this._service.list(queryParams)),
        takeUntil(this._destroy$)
      )
      .subscribe((res: IListResponse<EventModel>) => {
        this._meta = res.meta;
        this._list = res.data;
      });
  }
}
