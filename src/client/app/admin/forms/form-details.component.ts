import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { FormElementType, FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-form-details',
  templateUrl: 'form-details.component.html'
})
export class FormDetailsComponent extends DetailsComponent<FormModel> {
  protected _returnPath = ['/admin/forms'];

  public get FormElementType() {
    return FormElementType;
  }

  constructor(service: FormService,
              route: ActivatedRoute,
              protected _router: Router,
              protected _formService: FormService) {
    super(service, route);
  }

  public clone(model: FormModel) {
    this._formService.clone(model).subscribe(() => {
      if (this._returnPath) {
        this._router.navigate(this._returnPath);
      }
    });
  }
}
