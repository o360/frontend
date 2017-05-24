import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, ValidationErrors } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';

export const DateFormat = {
  Date: 'DD.MM.YYYY',
  DateTime: 'DD.MM.YYYY HH:mm'
};

let id = 0;

@Component({
  moduleId: module.id,
  selector: 'bs-datetime',
  templateUrl: 'datetime-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor, AfterViewInit {
  protected _innerValue: any;
  protected _date: any;
  protected _valid: boolean;
  protected _changed = new Array<(value: any) => void>();
  protected _touched = new Array<() => void>();
  protected _onlyDateMode: boolean = false;
  protected _disabled: boolean = false;
  protected _input: ElementRef;

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

  public get valid(): boolean {
    return this._valid;
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
  public set disabled(value: boolean | string) {
    this._disabled = typeof value === 'boolean' ? value : true;
  }

  public get disabled(): boolean | string {
    return this._disabled;
  }

  constructor(protected _translateService: TranslateService) {
  }

  public writeValue(value: any) {
    this._innerValue = value;
    this._date = this._formatDate(this._innerValue);
    this.invalid.subscribe(validState => {
      this._valid = !validState;
    });
  }

  public registerOnChange(fn: (value: any) => void) {
    this._changed.push(fn);
  }

  public registerOnTouched(fn: () => void) {
    this._touched.push(fn);
  }

  public onChange(value: any) {
    this.invalid.subscribe(validState => {
      if (!validState) {
        this._date = value;
        let datetime = this._parseDate(this._date);
        this._innerValue = datetime.toDate();
        this._changed.forEach(f => f(this._innerValue));
      }
      this._valid = !validState;
    });
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

  protected _validate(): Observable<ValidationErrors> {
    let errors: ValidationErrors = {};
    let date = this._parseDate(this._date);

    if (!date.isValid()) {
      Object.assign(errors, { date: 'T_ERROR_INVALID_DATE' });
    }

    return Observable.of(errors);
  }

  public get invalid(): Observable<boolean> {
    return this._validate().map(v => Object.keys(v || {}).length > 0);
  }

  public get failures(): Observable<Array<string>> {
    return this._validate().map(validator => Object.keys(validator).map(key => {
      switch (typeof validator[key]) {
        case 'string':
          return <string> validator[key];
        default:
          return `${key}`;
      }
    }));
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
