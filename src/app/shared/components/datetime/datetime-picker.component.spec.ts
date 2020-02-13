/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DateFormat, DateTimeComponent, ValidatorFutureDate, ValidatorIsAfter, ValidatorIsBefore } from './datetime-picker.component';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { FormBuilder, FormControl } from '@angular/forms';

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
    comp.value = date;
    expect(comp.date).toEqual(date);
  });

  it('should be date and time picker, could be only date picker', () => {
    comp.onlyDateMode = true;
    let date = new Date();

    comp.writeValue(date);
    expect(comp.date).toEqual(moment(date).format(DateFormat.Date));
  });

  it('should update the value inside the picker when it is changed', () => {
    let date = new Date(2001, 1, 10);

    comp.onChange(date);
    expect(comp.value).toEqual(date);
    comp.onBlur();
  });

  it('should validate the input', () => {
    let date = new Date(2013, 13, 1);

    let input: FormControl = new FormControl();
    input.setValue(date);
    expect(comp.validate(input)).toEqual({});
    expect(ValidatorFutureDate(input)).toEqual({ dateInPast: 'T_ERROR_DATE_IN_PAST' });

    comp.onlyDateMode = true;
    expect(comp.validate(input)).toEqual({});

    let test = 'test not a date';
    input.setValue(test);
    expect(comp.validate(input)).toEqual({ format: 'T_ERROR_INVALID_DATE' });

    input.reset();
    expect(comp.validate(input)).toEqual({ required: 'T_FORM_FIELD_IS_REQUIRED' });
  });

  it('should compare two date inputs and validate them', () => {
    let formBuilder: FormBuilder = new FormBuilder();
    let form = formBuilder.group({
      start: ['', [ValidatorIsBefore('end')]],
      end: ['', [ValidatorIsAfter('start')]],
      test: ['', ValidatorIsBefore('noInput')]
    });

    form.controls['start'].setValue(new Date(2010, 1, 1));
    form.controls['end'].setValue(new Date(2000, 1, 1));

    expect(form.controls['start'].valid).toBeFalsy();
    expect(form.controls['start'].errors).toEqual({ maxDate: true });
    expect(form.controls['end'].valid).toBeFalsy();
    expect(form.controls['end'].errors).toEqual({ minDate: true });

    form.controls['start'].setValue(new Date(1990, 1, 1));
    form.controls['end'].setValue(new Date(2000, 1, 1));

    expect(form.controls['start'].valid).toBeTruthy();
    expect(form.controls['start'].errors).toEqual(null);
    expect(form.controls['end'].valid).toBeTruthy();
    expect(form.controls['end'].errors).toEqual(null);
  });
});
