import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

@Defaults({
  description: '',
})
export class EventModel extends Model {
  public description?: string;
  public start: string;
  public end: string;
  public canRevote: boolean;
  public status: string;
  public notifications?: EventNotificationModel[];
}

export interface EventNotificationModel {
  time: string;
  kind: string;
  recipient: string;
}

export class EventNotificationKind {
  public static readonly PreBegin: string = 'preBegin';
  public static readonly PreEnd: string = 'preEnd';
  public static readonly Begin: string = 'begin';
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
