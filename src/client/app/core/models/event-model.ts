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
  public userInfo?: IFormsInfo;

  constructor(json?: Object) {
    super(json);
    if (!this.start) {
      this.start = moment().add(1, 'hour');
      this.end = moment().add(2, 'hour');
    }
    this.start = moment(this.start);
    this.end = moment(this.end);
  }


  public get state() {
    let totalForms = this.userInfo.totalFormsCount;
    let answeredForms = this.userInfo.answeredFormsCount;

    if (answeredForms === 0) {
      return EventState.NotStarted;
    } else if (totalForms === answeredForms) {
      return EventState.FullFilled;
    } else {
      return EventState.PartiallyFilled;
    }
  }

  public toJson(): any {
    this.start = moment(this.start).format(DateFormat.Backend);
    this.end = moment(this.end).format(DateFormat.Backend);
    return this._serialize(this);
  }
}

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
