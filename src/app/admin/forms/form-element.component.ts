import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequireValue } from './form-builder.component';
import { FormElementType, IFormElementValue } from '../../core/models/form-model';

@Component({
  selector: 'bs-form-builder-element',
  templateUrl: 'form-element.component.html'
})
export class AdminFormBuilderElementComponent {
  protected _element: FormGroup;

  @Input()
  public set element(value: FormGroup) {
    this._element = value;
  }

  public get element(): FormGroup {
    return this._element;
  }

  public get FormElementType() {
    return FormElementType;
  }

  constructor(protected _formBuilder: FormBuilder) {
  }

  public requireValue(kind: string) {
    return RequireValue(kind);
  }

  public addValue(caption: string) {
    let newValue: IFormElementValue = { caption };
    this._element.value.values.push(newValue);
    this._element.controls['valueCaption'].reset();
  }

  public deleteValue(value: IFormElementValue) {
    let index: number = this._element.value.values.indexOf(value);
    if (index !== -1) {
      this._element.value.values.splice(index, 1);
    }
  }
}
