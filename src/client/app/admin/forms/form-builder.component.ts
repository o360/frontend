import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormElementType, FormModel, IFormElement } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormComponent } from '../../shared/components/form.component';

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

  constructor(service: FormService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService) {
    super(service, router, route, notificationService);
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
