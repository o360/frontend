import { Defaults } from '../decorators/defaults.decorator';
import { Model } from './model';

export class EmailKind {
  public static readonly preBegin: string = 'preBegin';
  public static readonly begin: string = 'begin';
  public static readonly preEnd: string = 'preEnd';
  public static readonly end: string = 'end';
}

export class Recipient {
  public static readonly respondent: string = 'respondent';
  public static readonly auditor  : string = 'auditor';
}

@Defaults({
  name: '',
  subject: '',
  body: '',
  kind: 'preBegin',
  recipient: 'respondent'
})
export class EmailTemplateModel extends Model {
  public name: string;
  public subject: string;
  public body: string;
  public kind: string;
  public recipient: string;
}
