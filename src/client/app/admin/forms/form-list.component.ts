import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class FormListComponent extends ListComponent<FormModel> {

  constructor(service: FormService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(service, activatedRoute, router);
  }

  public clone(model: FormModel) {
    (<FormService>this._service).clone(model).subscribe(() => {
      this._update();
    });
  }
}
