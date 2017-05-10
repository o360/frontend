import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

export const DateFormat = {
  OnlyDate: 'DD.MM.YYYY',
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

  public onChange() {
    this.invalid.subscribe(validState => {
      if (!validState) {
        let datetime = this._parseDate(this._date);
        this._innerValue = datetime.toDate();
        this._changed.forEach(f => f(this._innerValue));
      }
      this._valid = !validState;
    });
  }

  public ngAfterViewInit() {
    let $element = $(this._input.nativeElement);

    let datepicker = $element.datepicker({
      timepicker: !this._onlyDateMode,
      language: this._translateService.currentLang,
    }).data('datepicker');

    this._translateService.onLangChange.forEach((e: LangChangeEvent) => {
      datepicker.update('language', e.lang);
    });

    $.fn.datepicker.language['en'] =  {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd.mm.yyyy',
      timeFormat: 'hh:ii',
      firstDay: 0
    };

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
      return moment(date).format(DateFormat.OnlyDate);
    } else {
      return moment(date).format(DateFormat.DateTime);
    }
  }

  protected _parseDate(date: any) {
    if (this.onlyDateMode) {
      return moment(date, DateFormat.OnlyDate, true);
    } else {
      return moment(date, DateFormat.DateTime, true);
    }
  }
}
