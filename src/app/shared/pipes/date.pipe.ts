import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DateFormat } from '../components/datetime/datetime-picker.component';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  public transform(date: any, format?: string): any {
    return format ? moment(date).format(format) : moment(date).format(DateFormat.DateTime);
  }
}
