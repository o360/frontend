import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form.component';
import { FormElement, FormElementType, FormElementValue, FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-form-builder',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent extends FormComponent<FormModel> {
  protected _returnPath = ['/admin/forms'];

  private _elementTypes: string[] = Object.values(FormElementType);

  public get elementTypes(): string[] {
    return this._elementTypes;
  }

  public get FormElementType() {
    return FormElementType;
  }

  constructor(service: FormService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  public addElement(kind: string) {
    let element: FormElement = {
      kind: kind,
      caption: '',
      required: true,
      values: []
    };
    this._model.elements.push(element);
  }

  public deleteElement(element: FormElement) {
    let index: number = this._model.elements.indexOf(element);
    if (index !== -1) {
      this._model.elements.splice(index, 1);
    }
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
