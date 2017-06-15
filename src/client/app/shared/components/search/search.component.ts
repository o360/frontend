import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AssessmentModel } from '../../../core/models/assessment-model';

@Component({
  moduleId: module.id,
  selector: 'bs-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {
  public list: AssessmentModel[];
  public searchControl: FormControl = new FormControl();
  private _itemsSearch: EventEmitter<AssessmentModel> = new EventEmitter<AssessmentModel>();
  private _items: AssessmentModel[];

  @Input()
  public set items(value: AssessmentModel[]) {
    this._items = value;
  }

  @Output()
  public get itemsSearch(): EventEmitter<AssessmentModel> {
    return this._itemsSearch;
  }

  public ngOnInit() {
    this.list = this._items;
    this.searchControl.valueChanges
      .distinctUntilChanged()
      .switchMap((term: string) => {
        this._items = [];
        return this.update(term);
      })
      .subscribe((item: AssessmentModel) => {
        this._items.push(item);
      });
  }

  public update(term: string) {
    this._itemsSearch.emit(this._items);

    let items = this.list.filter((e: AssessmentModel) => {
      return new RegExp(term, 'gi').test(e.user.name);
    });
    return Observable.from(items);
  }
}
