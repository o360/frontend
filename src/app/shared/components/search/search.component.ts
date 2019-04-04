
import {from as observableFrom,  Observable ,  Subscription } from 'rxjs';

import {switchMap, distinctUntilChanged} from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssessmentModel } from '../../../core/models/assessment-model';
import { Utils } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'bs-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  private _searchControl: FormControl = new FormControl();
  private _itemsSearch: EventEmitter<AssessmentModel[]> = new EventEmitter<AssessmentModel[]>();
  private _items: AssessmentModel[] = [];
  private _searchList: AssessmentModel[] = [];
  protected _list: AssessmentModel[];
  protected _searchSubscription: Subscription;

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
    this._searchSubscription = this._searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => {
        this._searchList = [];
        return this.update(term);
      }),)
      .subscribe((item: AssessmentModel) => {
        this._searchList.push(item);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this._list = this._items;
    }
  }

  public ngOnDestroy() {
    this._searchSubscription.unsubscribe();
  }

  public update(term: string) {
    term = term.replace(/\\/g, '')
      .replace(/\//g, '');

    this._itemsSearch.emit(this._searchList);

    let items = this._list.filter((e: AssessmentModel) => {
      if (e.user) {
        return new RegExp(term, 'gi').test(e.user.name) ||
          new RegExp(term, 'gi').test(Utils.transliterate(e.user.name));
      } else {
        return null;
      }
    });
    return observableFrom(items);
  }
}
