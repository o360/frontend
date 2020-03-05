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

import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';
import { DateFormat } from '../../shared/components/datetime/datetime-picker.component';
import { NotSerializable } from '../decorators/not-serializable.decorator';
import * as moment from 'moment';

export interface IFormsInfo {
  totalFormsCount: number;
  answeredFormsCount: number;
}

export interface IEventNotification {
  time: string;
  kind: string;
  recipient: string;
}

export class EventNotificationKind {
  public static readonly PreBegin: string = 'preBegin';
  public static readonly Begin: string = 'begin';
  public static readonly PreEnd: string = 'preEnd';
  public static readonly End: string = 'end';
}

export class EventRecipient {
  public static readonly Respondent: string = 'respondent';
  public static readonly Auditor: string = 'auditor';
}

export class EventStatus {
  public static readonly NotStarted: string = 'notStarted';
  public static readonly InProgress: string = 'inProgress';
  public static readonly Completed: string = 'completed';
}

export class EventSortField {
  public static readonly Start: string = 'start';
  public static readonly End: string = 'end';
}

export class EventState {
  public static readonly NotStarted: string = 'notstarted';
  public static readonly PartiallyFilled: string = 'partfilled';
  public static readonly FullFilled: string = 'fullfilled';
}

@Defaults({ notifications: [] })
export class EventModel extends Model {
  public description?: string;
  public start: any;
  public end: any;
  public status: string;
  public notifications: IEventNotification[];
  @NotSerializable() public userInfo?: IFormsInfo;

  @NotSerializable()
  public get state() {
    if (this.userInfo) {
      let totalForms = this.userInfo.totalFormsCount;
      let answeredForms = this.userInfo.answeredFormsCount;

      if (answeredForms === 0) {
        return EventState.NotStarted;
      }
      if (totalForms === answeredForms) {
        return EventState.FullFilled;
      }

      return EventState.PartiallyFilled;
    }

    return null;
  }

  constructor(json?: Object) {
    super(json);
    if (!this.start) {
      this.start = moment().add(1, 'hour');
      this.end = moment().add(2, 'hour');
    }
    this.start = moment(this.start);
    this.end = moment(this.end);
  }

  public toJson(): Object {
    this.start = moment(this.start).format(DateFormat.Backend);
    this.end = moment(this.end).format(DateFormat.Backend);

    return super.toJson();
  }
}
