import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeLeft',
  pure: false
})
export class TimeLeftPipe implements PipeTransform {
  public transform(endDate: any, startDate?: any): any {
    let tempEndDate, tempStartDate: string;
    tempEndDate = moment(endDate).format('DD.MM.YYYY HH:mm');
    if (startDate) {
      tempStartDate = moment(startDate).format('DD.MM.YYYY HH:mm');
      return moment(tempEndDate, 'DD.MM.YYYY HH:mm').from(moment(tempStartDate, 'DD.MM.YYYY HH:mm'));
    }
    return moment(tempEndDate, 'DD.MM.YYYY HH:mm').fromNow();
  }
}
