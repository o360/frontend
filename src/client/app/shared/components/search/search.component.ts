import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AssessmentModel } from '../../../core/models/assessment-model';
import { Utils } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'bs-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  private _searchControl: FormControl = new FormControl();
  private _itemsSearch: EventEmitter<AssessmentModel[]> = new EventEmitter<AssessmentModel[]>();
  private _items: AssessmentModel[] = [];
  private _searchList: AssessmentModel[] = [];
  protected _list: AssessmentModel[];
  protected _searchSubscription: any;


  @Input()
  public set items(value: AssessmentModel[]) {
    this._items = value;
  }

  @Output()
  public get itemsSearch(): EventEmitter<AssessmentModel[]> {
    return this._itemsSearch;
  }

  public get searchControl(): FormControl {
    return this._searchControl;
  }

  public ngOnInit() {
    this._list = this._items;
    this._searchSubscription = this._searchControl.valueChanges
      .distinctUntilChanged()
      .switchMap((term: string) => {
        this._searchList = [];
        return this.update(term);
      })
      .subscribe((item: AssessmentModel) => {
        this._searchList.push(item);
      });
  }

  public ngOnDestroy() {
    this._searchSubscription.unsubscribe();
  }

  public update(term: string) {
    this._itemsSearch.emit(this._searchList);

    let items = this._list.filter((e: AssessmentModel) => {
      return new RegExp(term, 'gi').test(e.user.name) ||
        new RegExp(term, 'gi').test(Utils.transliterate(e.user.name));
    });
    return Observable.from(items);
  }
}
