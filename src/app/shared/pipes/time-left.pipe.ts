import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeLeft',
  pure: false
})
export class TimeLeftPipe implements PipeTransform {
  public transform(endDate: any, startDate?: any): any {
    endDate = moment(endDate).format('DD.MM.YYYY HH:mm');
    if (startDate) {
      startDate = moment(startDate).format('DD.MM.YYYY HH:mm');
      return moment(endDate, 'DD.MM.YYYY HH:mm').from(moment(startDate, 'DD.MM.YYYY HH:mm'));
    } else {
      return moment(endDate, 'DD.MM.YYYY HH:mm').fromNow();
    }
  }
}
