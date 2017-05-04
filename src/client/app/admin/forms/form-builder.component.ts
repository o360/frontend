import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form.component';
import { FormElementType, FormModel, IFormElement } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-form-builder',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent extends FormComponent<FormModel> {
  protected _returnPath = ['/admin/forms'];
  protected _elementTypes: string[] = Object.values(FormElementType);

  public get elementTypes(): string[] {
    return this._elementTypes;
  }

  constructor(service: FormService, router: Router, route: ActivatedRoute,) {
    super(service, router, route);
  }

  public addElement(kind: string) {
    let element: IFormElement = {
      kind: kind,
      caption: null,
      required: false,
      values: []
    };
    this._model.elements.push(element);
  }

  public deleteElement(element: IFormElement) {
    let index: number = this._model.elements.indexOf(element);
    if (index !== -1) {
      this._model.elements.splice(index, 1);
    }
  }
}
