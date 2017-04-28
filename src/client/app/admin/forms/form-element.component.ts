import { Component, Input } from '@angular/core';
import { FormElement, FormElementValue } from '../../core/models/form-model';
import { FormBuilderComponent } from './form-builder.component';

@Component({
  moduleId: module.id,
  selector: 'bs-form-builder-element',
  templateUrl: 'form-element.component.html'
})
export class FormBuilderElementComponent extends FormBuilderComponent {
  protected _element: FormElement;

  @Input()
  public set element(value: FormElement) {
    this._element = value;
  }

  public get element(): FormElement {
    return this._element;
  }

  public addValue(element: FormElement, caption: string, value: string) {
    let newValue: FormElementValue = {
      caption: caption,
      value: value
    };
    element.values.push(newValue);
  }

  public deleteValue(element: FormElement, value: FormElementValue) {
    let index: number = element.values.indexOf(value);
    if (index !== -1) {
      element.values.splice(index, 1);
    }
  }
}
