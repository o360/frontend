import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { FormModel } from '../../core/models/form-model';
import { FormService } from '../../core/services/form.service';

@Component({
  moduleId: module.id,
  selector: 'bs-form-list',
  templateUrl: 'form-list.component.html'
})
export class FormListComponent extends ListComponent<FormModel> {
  constructor(service: FormService) {
    super(service);
  }
}
