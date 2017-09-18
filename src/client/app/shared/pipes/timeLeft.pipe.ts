import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeLeft',
  pure: false
})
export class TimeLeftPipe implements PipeTransform {
  public transform(endDate: any, startDate?: any): any {
    if (startDate) {
      return moment(endDate, 'DD.MM.YYYY HH:mm').from(moment(startDate, 'DD.MM.YYYY HH:mm'));
    } else {
      return moment(endDate, 'DD.MM.YYYY HH:mm').fromNow();
    }
  }
}
