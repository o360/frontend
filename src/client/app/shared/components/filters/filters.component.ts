import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType } from '../../../core/models/filter';
import { IQueryParams } from '../../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {
  private _filters: Filter[] = [];
  private _filterChange: EventEmitter<any> = new EventEmitter<any>();
  private _isCollapsed: boolean;

  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  public set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }

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
    let params: IQueryParams = this._filters
      .filter(x => x.value !== undefined && x.value !== null)
      .reduce((acc, filter) => Object.assign(acc, { [filter.field]: filter.value.toString() }), {});

    this._filterChange.emit(params);
  }

  public reset() {
    this._filters.map(x => x.value = null);
    this.apply();
  }

  public resetFilter(f: Filter) {
    f.value = null;
    this.apply();
  }
}
