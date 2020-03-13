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

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

export const ValidatorIsAfter = (otherDateName: string) => {
  let thisDate: FormControl;
  let otherDate: FormControl;

  return function matchOtherValidate(control: FormControl) {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisDate) {
      thisDate = control;
      otherDate = control.parent.get(otherDateName) as FormControl;
      if (!otherDate) {
        throw new Error('Other control is not found in parent group');
      }
      otherDate.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(100)
        )
        .subscribe(() => {
          thisDate.updateValueAndValidity();
        });
    }

    if (!otherDate) {
      return null;
    }

    if (!moment(thisDate.value).isValid() || !moment(otherDate.value).isValid() || !moment(thisDate.value).isSameOrAfter(otherDate.value)) {
      return {
        minDate: true
      };
    }

    return null;
  };
};

export const ValidatorIsBefore = (otherDateName: string) => {
  let thisDate: FormControl;
  let otherDate: FormControl;

  return function matchOtherValidate(control: FormControl) {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisDate) {
      thisDate = control;
      otherDate = control.parent.get(otherDateName) as FormControl;
      if (!otherDate) {
        throw new Error('Other control is not found in parent group');
      }
      otherDate.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(100)
        )
        .subscribe(() => {
          thisDate.updateValueAndValidity();
        });
    }

    if (!otherDate) {
      return null;
    }

    if (!moment(thisDate.value).isValid() || !moment(otherDate.value).isValid() ||
      !moment(thisDate.value).isSameOrBefore(otherDate.value)) {
      return {
        maxDate: true
      };
    }

    return null;
  };
};

export const ValidatorFutureDate = (control: FormControl) => {
  let isFuture = moment(control.value).isAfter(moment.now());

  return isFuture ? null : { dateInPast: 'T_ERROR_DATE_IN_PAST' };
};

export enum DateFormat {
  Date = 'DD.MM.YYYY',
  Time = 'HH:mm',
  DateTime = 'DD.MM.YYYY HH:mm',
  Backend = 'YYYY-MM-DDTHH:mm:ss',
}

export enum AirPickerDateFormat {
  Date = 'dd.mm.yyyy',
  Time = 'hh:ii'
}

let id = 0;

@Component({
  selector: 'bs-datetime',
  templateUrl: 'datetime-picker.component.html',
  styleUrls: ['datetime-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimeComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateTimeComponent),
    multi: true
  }]
})
export class DateTimeComponent implements ControlValueAccessor, AfterViewInit, Validator {
  @ViewChild(NgModel, { static: true })
  public model: NgModel;

  protected _innerValue: any;
  protected _date: any;
  protected _onlyDateMode: boolean = false;
  protected _disable: boolean = false;
  protected _input: ElementRef;
  protected _id = `picker-${id++}`;

  private _mapDateFormatToAirDateFormat: object = {
    [DateFormat.Date]: AirPickerDateFormat.Date,
    [DateFormat.Time]: AirPickerDateFormat.Time,
  };

  public get value(): any {
    return this._innerValue;
  }

  public set value(value: any) {
    this._innerValue = value;
  }

  public get date(): any {
    return this._date;
  }

  public set date(value: any) {
    this._date = value;
  }

  public get id(): string {
    return this._id;
  }

  @ViewChild('input', { static: true })
  public set input(value: ElementRef) {
    this._input = value;
  }

  @Input()
  public set onlyDateMode(value: boolean | string) {
    this._onlyDateMode = typeof value === 'boolean' ? value : true;
  }

  @Input()
  public set disable(value: boolean) {
    this._disable = typeof value === 'boolean' ? value : true;
  }

  public get disable(): boolean {
    return this._disable;
  }

  constructor(protected _translateService: TranslateService) {
  }

  public writeValue(value: any) {
    if (value) {
      this._innerValue = value;
      this._date = this._formatDate(this._innerValue);
    }
  }

  public registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  public registerOnTouched(fn: any) {
    this._propagateTouch = fn;
  }

  public onChange(value: any) {
    this._date = value;
    let datetime = this._parseDate(this._date);
    this._propagateChange(datetime);
    this._innerValue = datetime.toDate();
  }

  public ngAfterViewInit() {
    let $element = <any> $(this._input.nativeElement);

    let datepicker = $element.datepicker({
      timepicker: !this._onlyDateMode,
      language: this._translateService.currentLang,
      startDate: new Date(this._innerValue),
      dateFormat: this._mapDateFormatToAirDateFormat[DateFormat.Date],
      timeFormat: this._mapDateFormatToAirDateFormat[DateFormat.Time],
      firstDay: 0,
      onSelect: (formattedDate: any) => this.onChange(formattedDate),
    }).data('datepicker');

    this._translateService.onLangChange.forEach((e: LangChangeEvent) => {
      datepicker.update('language', e.lang);
    });
  }

  public validate(c: FormControl): ValidationErrors {
    if (!c.value) {
      return { required: 'T_FORM_FIELD_IS_REQUIRED' };
    }

    if (!this._parseDate(c.value).isValid()) {
      return { format: 'T_ERROR_INVALID_DATE' };
    }

    return {};
  }

  public onBlur() {
    this._propagateTouch();
  }

  protected _formatDate(date: any) {
    const format = this._onlyDateMode ? DateFormat.Date : DateFormat.DateTime;

    return moment(date).format(format);
  }

  protected _parseDate(date: any) {
    const format = this._onlyDateMode ? DateFormat.Date : DateFormat.DateTime;

    return moment(date, format, true);
  }

  protected _propagateChange: Function = () => ({});

  protected _propagateTouch: Function = () => ({});
}
