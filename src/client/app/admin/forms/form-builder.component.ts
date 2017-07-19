import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormElement, FormElementType, FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormComponent } from '../../shared/components/form.component';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

export const RequireValue = (kind: string): boolean => {
  return [
    FormElementType.Radio,
    FormElementType.Checkboxgroup,
    FormElementType.Select
  ].includes(kind);
};

export const FormBuilderValidator = (control: AbstractControl): ValidationErrors => {
  const elements = (control.get('elements') as FormArray).value;
  return elements.length ? null : { noElements: true };
};

export const FormElementValidator = (control: AbstractControl): ValidationErrors => {
  const values = (control.get('values') as FormArray).value;
  return (!!values.length) ? null : { noValues: 'T_FORM_VALUES_ARE_REQUIRED' };
};

@Component({
  moduleId: module.id,
  selector: 'bs-form-builder',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent extends FormComponent<FormModel> implements OnInit {
  protected static _idSeq = 0;

  protected _returnPath = ['/admin/forms'];
  protected _elementTypes: string[] = Object.values(FormElementType);
  protected _form: FormGroup;

  protected _index: number = FormBuilderComponent.next();

  protected static next() {
    return FormBuilderComponent._idSeq++;
  }

  public get index(): number {
    return this._index;
  }

  public get elementTypes(): string[] {
    return this._elementTypes;
  }

  public get FormElementType(): any {
    return FormElementType;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public get elements(): FormArray {
    return this.form.get('elements') as FormArray;
  }

  public get isLikesDislikesForm(): boolean {
    return (this._form.value['elements'].length && this._form.value['elements'][0].kind === FormElementType.LikeDislike);
  }

  constructor(service: FormService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _formBuilder: FormBuilder) {
    super(service, router, route, notificationService, breadcrumbService);

    this._createForm();
  }

  protected _processModel(model: FormModel) {
    super._processModel(model);

    this._form.reset({
      name: this._model.name,
      showInAggregation: this._model.showInAggregation
    });
    this._setElements(this._model.elements);
  }

  public save() {
    this._model = this._prepareSaveForm();


    super.save();
  }

  public addElement(kind: string) {
    let element: FormElement = new FormElement({
      kind: kind,
      caption: null,
      required: false,
    });

    if (RequireValue(kind)) {
      element.values = [];
    }

    this.elements.push(this._prepareFormGroup(element));
  }

  public deleteElement(index: number) {
    this.elements.removeAt(index);
  }

  protected _createForm() {
    this._form = this._formBuilder.group({
        name: ['', Validators.pattern(/.*^[\S].*/)],
        elements: this._formBuilder.array([]),
        showInAggregation: true
      },
      { validator: FormBuilderValidator });
  }

  protected _setElements(elements: FormElement[]) {
    let elementFGs = elements.map(element => this._prepareFormGroup(element));
    let elementFormArray = this._formBuilder.array(elementFGs);
    this._form.setControl('elements', elementFormArray);
  }

  protected _prepareSaveForm(): FormModel {
    let formModel = this._form.value;
    let elementsCopy = this.elements.controls.map(x => x.value);

    let saveForm: FormModel = new FormModel({
      name: formModel.name,
      elements: elementsCopy,
      showInAggregation: formModel.showInAggregation
    });

    if (this._model.id) {
      saveForm.id = this._model.id;
    }

    return saveForm;
  }

  protected _prepareFormGroup(element: FormElement) {
    let form: FormGroup;

    if (RequireValue(element.kind)) {
      form = this._formBuilder.group({
        caption: [element.caption, [Validators.required, Validators.pattern(/.*^[\S].*/)]],
        required: element.required,
        valueCaption: ['', Validators.pattern(/.*^[\S].*/)],
        values: this._formBuilder.array(element.values),
        kind: element.kind
      }, { validator: FormElementValidator });
    } else if (element.kind === FormElementType.LikeDislike) {
      form = this._formBuilder.group({
        caption: 'like-dislike',
        required: false,
        values: this._formBuilder.array([{
          caption: 'like'
        }, {
          caption: 'dislike'
        }]),
        kind: element.kind
      }, { validator: FormElementValidator });
    } else {
      form = this._formBuilder.group({
        caption: [element.caption, [Validators.required, Validators.pattern(/.*^[\S].*/)]],
        required: element.required,
        kind: element.kind
      });
    }
    return form;
  }
}
