import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';
import * as moment from 'moment';
import { DateFormat } from '../../shared/components/datetime/datetime-picker.component';

@Defaults({
  start: new Date(),
  end: new Date(),
  canRevote: false,
  notifications: []
})
export class EventModel extends Model {
  public description?: string;
  public start: any;
  public end: any;
  public canRevote: boolean;
  public status: string;
  public notifications: IEventNotification[];


  constructor(json: Object) {
    super(json);
    this.start = new Date(this.start);
    this.end = new Date(this.end);
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
