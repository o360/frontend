import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class FormListComponent extends ListComponent<FormModel> {

  constructor(service: FormService,
              activatedRoute: ActivatedRoute,
              router: Router,
              protected _formService: FormService) {
    super(service, activatedRoute, router);
  }

  public clone(model: FormModel) {
    this._formService.clone(model).subscribe(() => {
      this._update();
    });
  }
}
