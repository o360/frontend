import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validator } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

export const DateFormat = {
  Date: 'DD.MM.YYYY',
  DateTime: 'DD.MM.YYYY HH:mm',
  Backend: 'YYYY-MM-DDTHH:mm:ss'
};

let id = 0;

@Component({
  moduleId: module.id,
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
  protected _disabled: boolean = false;
  protected _input: ElementRef;
  protected _propagateChange: Function;
  protected _propagateTouch: Function;

  protected _id = `picker-${ id++ }`;

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
  public set disabled(value: boolean) {
    this._disabled = typeof value === 'boolean' ? value : true;
  }

  public get disabled(): boolean {
    return this._disabled;
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
    let $element = $(this._input.nativeElement);

    Object.assign($.fn.datepicker.language['en'], {
      dateFormat: 'dd.mm.yyyy',
      timeFormat: 'hh:ii',
      firstDay: 0
    });

    let datepicker = $element.datepicker({
      timepicker: !this._onlyDateMode,
      language: this._translateService.currentLang,
      onSelect: (formattedDate: any) => {
        this.onChange(formattedDate);
      }
    }).data('datepicker');

    this._translateService.onLangChange.forEach((e: LangChangeEvent) => {
      datepicker.update('language', e.lang);
    });
  }

  public validate(c: FormControl) {
    if (c.value) {
      let date = this._parseDate(c.value);
      return (date.isValid()) ? null : { format: 'T_ERROR_INVALID_DATE' };
    } else {
      return { required: 'T_FORM_FIELD_IS_REQUIRED' };
    }
  }

  public onBlur() {
    this._propagateTouch();
  }

  protected _formatDate(date: any) {
    if (this.onlyDateMode) {
      return moment(date).format(DateFormat.Date);
    } else {
      return moment(date).format(DateFormat.DateTime);
    }
  }

  protected _parseDate(date: any) {
    if (this.onlyDateMode) {
      return moment(date, DateFormat.Date, true);
    } else {
      return moment(date, DateFormat.DateTime, true);
    }
  }
}
