import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';
import * as moment from 'moment';
import { DateFormat } from '../../shared/components/datetime/datetime-picker.component';

@Defaults({
  notifications: []
})
export class EventModel extends Model {
  public description?: string;
  public start: any;
  public end: any;
  public status: string;
  public notifications: IEventNotification[];
  public userInfo: IUserInfo;

  constructor(json?: Object) {
    super(json);
    if (!this.start) {
      this.start = moment().add(1, 'hour');
      this.end = moment().add(2, 'hour');
    }
    this.start = moment(this.start);
    this.end = moment(this.end);
  }

  public toJson(): any {
    this.start = moment(this.start).format(DateFormat.Backend);
    this.end = moment(this.end).format(DateFormat.Backend);
    return JSON.stringify(this);
  }
}

export interface IEventNotification {
  time: string;
  kind: string;
  recipient: string;
}

export interface IUserInfo {
  answeredFormsCount: number;
  totalFormsCount: number;
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
  public static readonly PartFilled: string = 'partfilled';
  public static readonly FullFilled: string = 'fullfilled';
}
