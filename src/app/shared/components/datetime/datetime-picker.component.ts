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

export const DateFormat = {
  Date: 'DD.MM.YYYY',
  DateTime: 'DD.MM.YYYY HH:mm',
  Backend: 'YYYY-MM-DDTHH:mm:ss'
};

export const ValidatorFutureDate = (control: FormControl) => {
  let isFuture = moment(control.value).isAfter(moment.now());
  return isFuture ? null : { dateInPast: 'T_ERROR_DATE_IN_PAST' };
};

let id = 0;

@Component({
  selector: 'bs-datetime',
  templateUrl: 'datetime-picker.component.html',
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
  protected _innerValue: any;
  protected _date: any;
  protected _onlyDateMode: boolean = false;
  protected _disable: boolean = false;
  protected _input: ElementRef;
  protected _id = `picker-${id++}`;

  @ViewChild(NgModel)
  public model: NgModel;

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

  @ViewChild('input')
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
      dateFormat: 'dd.mm.yyyy',
      timeFormat: 'hh:ii',
      firstDay: 0,
      onSelect: (formattedDate: any) => {
        this.onChange(formattedDate);
      }
    }).data('datepicker');

    this._translateService.onLangChange.forEach((e: LangChangeEvent) => {
      datepicker.update('language', e.lang);
    });
  }

  public validate(c: FormControl): ValidationErrors {
    let errors: ValidationErrors = {};
    if (c.value) {
      let date = this._parseDate(c.value);
      if (!date.isValid()) {
        Object.assign(errors, { format: 'T_ERROR_INVALID_DATE' });
      }
    } else {
      Object.assign(errors, { required: 'T_FORM_FIELD_IS_REQUIRED' });
    }

    return errors;
  }

  public onBlur() {
    this._propagateTouch();
  }

  protected _formatDate(date: any) {
    if (this._onlyDateMode) {
      return moment(date).format(DateFormat.Date);
    } else {
      return moment(date).format(DateFormat.DateTime);
    }
  }

  protected _parseDate(date: any) {
    if (this._onlyDateMode) {
      return moment(date, DateFormat.Date, true);
    } else {
      return moment(date, DateFormat.DateTime, true);
    }
  }

  protected _propagateChange: Function = () => ({});
  protected _propagateTouch: Function = () => ({});
}
