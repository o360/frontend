import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormElementType, IFormElement, IFormElementValue } from '../../core/models/form-model';

@Component({
  moduleId: module.id,
  selector: 'bs-form-builder-element',
  templateUrl: 'form-element.component.html'
})
export class FormBuilderElementComponent {
  protected static _idSeq = 0;
  protected static next() {
    return FormBuilderElementComponent._idSeq++;
  }

  protected _element: IFormElement;
  protected _newValue: IFormElementValue;
  protected _valid: boolean = null;
  protected _index: number = FormBuilderElementComponent.next();

  @Input()
  public set element(value: IFormElement) {
    this._element = value;
  }

  public get element(): IFormElement {
    return this._element;
  }

  public get index(): number {
    return this._index;
  }

  public requireValue(kind: string) {
    return [
      FormElementType.Radio,
      FormElementType.Checkboxgroup,
      FormElementType.Select
    ].includes(kind);
  }

  public get valid(): boolean {
/*    setTimeout(() => {
      if (this._element) {
        let valueValid = this.requireValue(this._element.kind) ? this._element.values.length > 0 : true;
        let prevValue = this._valid;
        this._valid = !!this._element.caption && valueValid;
      }
    });*/

    return this._valid;
  }


  public addValue(caption: string, value: string) {
    this._newValue = {
      caption: caption,
      value: value
    };
    this._element.values.push(this._newValue);
  }

  public deleteValue(value: IFormElementValue) {
    let index: number = this._element.values.indexOf(value);
    if (index !== -1) {
      this._element.values.splice(index, 1);
    }
  }
}
