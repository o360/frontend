import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType } from '../../../core/models/filter';

@Component({
  moduleId: module.id,
  selector: 'bs-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {
  private _filters: Filter[] = [];
  private _result: Object = {};
  private _filterChange: EventEmitter<any> = new EventEmitter<any>();

  public get filters(): Filter[] {
    return this._filters;
  }

  @Input()
  public set filters(value: Filter[]) {
    this._filters = value;
  }

  @Output()
  public get filterChange(): EventEmitter<any> {
    return this._filterChange;
  }

  public get FilterType() {
    return FilterType;
  }

  public apply() {
    this._filters.forEach(filter => {
      if (filter.value !== undefined) {
        Object.assign(this._result, { [filter.field]: filter.value });
      }
    });

    this._filterChange.emit(JSON.stringify(this._result));
  }
}
