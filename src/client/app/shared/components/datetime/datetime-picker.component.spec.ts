import { DateFormat, DateTimeComponent, ValidatorFutureDate, ValidatorIsAfter } from './datetime-picker.component';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

export function main() {
  describe('Date and time picker', () => {
    let comp: DateTimeComponent;
    let translateService: TranslateService;

    beforeEach(() => {
      comp = new DateTimeComponent(translateService);
    });

    it('should define a component', () => {
      expect(comp).toBeDefined();
    });

    it('should be enabled and could be disabled', () => {
      expect(comp.disable).toBeFalsy();
      comp.disable = true;
      expect(comp.disable).toBeTruthy();
    });

    it('should write the value', () => {
      let date = new Date();

      comp.writeValue(date);

      expect(comp.date).toEqual(moment(date).format(DateFormat.DateTime));
      expect(comp.value).toEqual(date);

      date = new Date('15.10.2018');
      comp.date = date;
      expect(comp.date).toEqual(date);
    });

    it('should be date and time picker, could be only date picker', () => {
      comp.onlyDateMode = true;
      let date = new Date();

      comp.writeValue(date);
      expect(comp.date).toEqual(moment(date).format(DateFormat.Date));
    });


    it('should update the value inside the picker when it is changed', () => {
      let date = new Date('10.01.2001');

      comp.onChange(date);
      expect(comp.value).toEqual(date);
    });

    it('should validate the input', () => {
      let date = new Date('10.01.2001');

      let input: FormControl = new FormControl();
      input.setValue(date);
      expect(comp.validate(input)).toEqual({});

      expect(ValidatorFutureDate(input)).toEqual({ dateInPast: 'T_ERROR_DATE_IN_PAST' });

      // let secondInput: FormControl = new FormControl();
      // secondInput.setValue(new Date('10.02.2011'));
      // expect(ValidatorIsAfter('')).toEqual({ dateInPast: 'T_ERROR_DATE_IN_PAST' });
      // expect(ValidatorFutureDate(input)).toEqual({ dateInPast: 'T_ERROR_DATE_IN_PAST' });
    });
  });
}
