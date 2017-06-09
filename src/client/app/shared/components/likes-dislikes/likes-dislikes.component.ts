import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormElement } from '../../../core/models/form-model';

let id = 0;

@Component({
  moduleId: module.id,
  selector: 'bs-likes-dislikes',
  templateUrl: 'likes-dislikes.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LikesDislikesComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => LikesDislikesComponent),
    multi: true
  }],
  styleUrls: ['likes-dislikes.component.css']
})
export class LikesDislikesComponent implements ControlValueAccessor, Validator {
  protected _element: FormElement;
  protected _innerValue: any;
  protected _propagateChange: Function;
  protected _propagateTouch: Function;

  protected _id = `like-dislike-${ id++ }`;

  @ViewChild(NgModel)
  public model: NgModel;

  public get value(): any {
    return this._innerValue;
  }

  public set value(value: any) {
    this._innerValue = value;
  }

  get element(): FormElement {
    return this._element;
  }

  @Input()
  set element(value: FormElement) {
    this._element = value;
  }

  constructor(protected _translateService: TranslateService) {
  }

  public writeValue(value: any) {
    if (value) {
      this._innerValue = value;
    } else {
      this._innerValue = {valuesIds: []};
    }
  }

  public registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  public registerOnTouched(fn: any) {
    this._propagateTouch = fn;
  }

  public onChange(value: any) {
  }

  public onLikeDislikeChange(value: any) {
    this._innerValue.valuesIds[0] = value;
    this._propagateChange(this._innerValue);
  }

  public onCommentChange(value: any) {
    this._innerValue.text = value;
    this._propagateChange(this._innerValue);
  }

  public validate(c: FormControl): ValidationErrors {
    let errors: ValidationErrors = {};
    if (c.value) {
    }

    return errors;
  }

  public onBlur() {
    this._propagateTouch();
  }

}
