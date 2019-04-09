import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormElement } from '../../../core/models/form-model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { UserModel } from '../../../core/models/user-model';

let id = 0;

@Component({
  selector: 'bs-likes-dislikes',
  templateUrl: 'likes-dislikes.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LikesDislikesComponent),
    multi: true
  }],
  styleUrls: ['likes-dislikes.component.scss']
})
export class LikesDislikesComponent implements ControlValueAccessor {
  protected _element: FormElement;
  protected _user: UserModel;
  protected _innerValue: any;
  protected _propagateChange: Function;
  protected _propagateTouch: Function;
  protected _disabled: boolean;

  protected _id = `like-dislike-${ id++ }`;

  @ViewChild(NgModel)
  public model: NgModel;

  public get value(): any {
    return this._innerValue;
  }

  public set value(value: any) {
    this._innerValue = value;
  }

  public get element(): FormElement {
    return this._element;
  }

  @Input()
  public set element(value: FormElement) {
    this._element = value;
  }

  public get id(): string {
    return this._id;
  }

  public get user(): UserModel {
    return this._user;
  }

  @Input()
  public set user(value: UserModel) {
    this._user = value;
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  constructor(protected _translateService: TranslateService) {
  }

  public isSelected(value: any): boolean {
    return (this._innerValue.valuesIds) ? (this._innerValue.valuesIds.indexOf(value) !== -1) : false;
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

  public select(value: any) {
    if (value === this._innerValue.valuesIds[0]) {
      this._innerValue.valuesIds = [];
    } else {
      this._innerValue.valuesIds = [+value];
    }
    this._propagateChange(this._innerValue);
  }

  public onCommentChange(value: any) {
    this._innerValue.text = value;
    this._propagateChange(this._innerValue);
  }

  public onBlur() {
    this._propagateTouch();
  }
}
