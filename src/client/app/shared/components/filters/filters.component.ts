import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType } from '../../../core/models/filter';
import { TranslateService } from '@ngx-translate/core';
import { IQueryParams } from '../../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {
  private _filters: Filter[] = [];
  private _result: IQueryParams;
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

  constructor(protected _translateService: TranslateService) {
  }

  public apply() {
    this._result = {};
    this._filters.forEach(filter => {
      if (filter.value !== undefined) {
        Object.values(filter.values)
          .map(x => {
            if (filter.value === this._translateService.instant(x.name)) {
              Object.assign(this._result, { [filter.field]: x.value });
            }
          });
      }
      this._filterChange.emit(this._result);
    });
  }
}
